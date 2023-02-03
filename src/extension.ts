import { Deferred } from "./deferred.js"
import { Op, Operation, guard } from "./operation.js"
import { Option, some, none } from "./option.js"

const noop = () => {}

/**
always ready for synchronization
*/
export function always<T>(data: T): Op<T> {
	return new Operation((performed, idx) => {
		return {
			poll: () => performed.resolve(idx),
			suspend: noop,
			result: () => data,
		}
	})
}

/**
never ready for synchronization
*/
export function never(): Op<never> {
	return new Operation((_performed, _idx) => {
		return {
			poll: noop,
			suspend: noop,
			result: () => {
				throw new Error("never")
			},
		}
	})
}

/**
convert `Promise` to `Op`

> **Warning**
> if `Promise` is rejected, `await op.sync()` will throw the error.

```typescript
await fromPromise(Promise.reject("error").catch(err => err)).sync()
```
*/
export function fromPromise<T>(p: Promise<T>): Op<Promise<T>> {
	const pp = p.catch(noop)
	let fulfilled = false
	pp.finally(() => (fulfilled = true))
	return new Operation((performed, idx) => {
		return {
			poll: () => {
				if (fulfilled) performed.resolve(idx)
			},
			suspend: () => {
				pp.finally(() => performed.resolve(idx))
			},
			result: () => p,
		}
	})
}

/**
convert `AbortSignal` to `Op`
*/
export function fromAbortSignal(signal: AbortSignal): Op<unknown> {
	let reason = null as unknown
	return new Operation((performed, idx) => {
		return {
			poll: () => {
				if (signal.aborted) {
					reason = signal.reason
					performed.resolve(idx)
				}
			},
			suspend: () => {
				const cb = () => {
					reason = signal.reason
					performed.resolve(idx)
				}
				signal.addEventListener("abort", cb, { once: true })
				performed.promise.finally(() =>
					signal.removeEventListener("abort", cb),
				)
			},
			result: () => reason,
		}
	})
}

/**
the timer is started when `Op` is polled
*/
export function timeout(delay: number): Op<void> {
	return guard(() => after(delay))
}

/**
the timer is started when `Op` is created
*/
export function after(delay: number): Op<void> {
	let out = false
	let handler = () => {
		out = true
	}
	const timer = setTimeout(() => handler(), delay)
	return new Operation((performed, idx) => {
		return {
			poll: () => {
				if (out) performed.resolve(idx)
			},
			suspend: () => {
				handler = () => {
					performed.resolve(idx)
				}
				performed.promise.finally(() => clearTimeout(timer)).catch(noop)
			},
			result: noop,
		}
	})
}

export class Mutex {
	private _locked: boolean
	private _queue: { performed: Deferred<number>; idx: number }[]
	constructor() {
		this._locked = false
		this._queue = []
	}
	lock(): Op<void> {
		return new Operation((performed, idx) => {
			return {
				poll: () => {
					if (!this._locked) {
						this._locked = true
						performed.resolve(idx)
					}
				},
				suspend: () => {
					this._queue.push({ performed, idx })
				},
				result: noop,
			}
		})
	}
	unlock(): void {
		if (this._locked) {
			while (this._queue.length > 0) {
				const { performed, idx } = this._queue.shift()!
				if (!performed.isFulfilled) {
					performed.resolve(idx)
					return
				}
			}
			this._locked = false
		}
	}
	async withLock<T>(f: () => T | Promise<T>): Promise<T> {
		await this.lock().sync()
		try {
			return await f()
		} finally {
			this.unlock()
		}
	}
}

export class IVar<T> {
	private _value: Option<T>
	private _queue: { performed: Deferred<number>; idx: number }[]
	constructor() {
		this._value = none
		this._queue = []
	}

	/**
	fill `IVar` if it is empty.
	return `false` if it's not empty.
	*/
	put(value: T): boolean {
		if (this._value.isSome()) {
			return false
		} else {
			this._value = some(value)
			this._queue.forEach(({ performed, idx }) => performed.resolve(idx))
			this._queue = []
			return true
		}
	}

	/**
	read `IVar`
	*/
	get(): Op<T> {
		return new Operation((performed, idx) => {
			return {
				poll: () => {
					if (this._value.isSome()) {
						performed.resolve(idx)
					}
				},
				suspend: () => {
					this._queue.push({ performed, idx })
				},
				result: () => this._value.unwrap(),
			}
		})
	}
}

export class MVar<T> {
	private _value: Option<T>
	private _queue: (() => void)[]
	constructor() {
		this._value = none
		this._queue = []
	}

	/**
	fill `MVar` if it is empty
	return `false` if it's not empty.
	*/
	put(value: T): boolean {
		if (this._value.isSome()) {
			return false
		} else {
			this._value = some(value)
			if (this._queue.length > 0) {
				const queue = this._queue
				this._queue = []
				queue.forEach((cb) => cb())
			}
			return true
		}
	}

	/**
	read `MVar`
	*/
	get(): Op<T> {
		return new Operation((performed, idx) => {
			return {
				poll: () => {
					if (this._value.isSome()) {
						performed.resolve(idx)
					}
				},
				suspend: () => {
					this._queue.push(() => performed.resolve(idx))
				},
				result: () => this._value.unwrap(),
			}
		})
	}

	/**
	read `MVar` and clear it
	*/
	take(): Op<T> {
		return new Operation((performed, idx) => {
			let value = null as T
			return {
				poll: () => {
					if (this._value.isSome()) {
						value = this._value.unwrap()
						this._value = none
						performed.resolve(idx)
					}
				},
				suspend: () => {
					const cb = () => {
						if (performed.isFulfilled) return
						if (this._value.isSome()) {
							value = this._value.unwrap()
							this._value = none
							performed.resolve(idx)
						} else {
							this._queue.push(cb)
						}
					}
					this._queue.push(cb)
				},
				result: () => value,
			}
		})
	}

	/**
	read `MVar` and replace it with `newValue`
	*/
	swap(newValue: T): Op<T> {
		return new Operation((performed, idx) => {
			let oldValue = null as T
			return {
				poll: () => {
					if (this._value.isSome()) {
						oldValue = this._value.unwrap()
						this._value = some(newValue)
						performed.resolve(idx)
					}
				},
				suspend: () => {
					const cb = () => {
						if (performed.isFulfilled) return
						if (this._value.isSome()) {
							oldValue = this._value.unwrap()
							this._value = some(newValue)
							performed.resolve(idx)
						} else {
							this._queue.push(cb)
						}
					}
					this._queue.push(cb)
				},
				result: () => oldValue,
			}
		})
	}
}
