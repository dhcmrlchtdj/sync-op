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
> if the `Promise` rejected, `await op.sync()` will throw the error.

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
the timer is started when `Op` polled
*/
export function timeout(delay: number): Op<void> {
	return guard(() => after(delay))
}

/**
the timer is started when `Op` created
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
}
