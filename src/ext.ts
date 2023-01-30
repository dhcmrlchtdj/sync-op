import { Op, Operation, guard } from "./operation.js"

const noop = () => {}

/**
an operation that is always ready for synchronization
*/
export function always<T>(data: T): Op<T> {
	return new Operation((performed, idx) => {
		return {
			poll: () => {
				performed.resolve(idx)
				return true
			},
			suspend: noop,
			result: () => data,
		}
	})
}

/**
an operation that is never ready for synchronization
*/
export function never(): Op<never> {
	return new Operation((_performed, _idx) => {
		return {
			poll: () => false,
			suspend: noop,
			result: () => {
				throw new Error("never")
			},
		}
	})
}

/**
convert promise to operation

> **Warning**
> if the promise rejected, `await op.sync()` will throw the error.

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
				if (fulfilled) {
					performed.resolve(idx)
					return true
				} else {
					return false
				}
			},
			suspend: () => {
				pp.finally(() => performed.resolve(idx))
			},
			result: () => p,
		}
	})
}

/**
convert AbortSignal to operation
*/
export function fromAbortSignal(signal: AbortSignal): Op<unknown> {
	let reason = null as unknown
	return new Operation((performed, idx) => {
		return {
			poll: () => {
				if (signal.aborted) {
					reason = signal.reason
					performed.resolve(idx)
					return true
				} else {
					return false
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
the timer is started when the Op is polled
*/
export function timeout(delay: number): Op<void> {
	return guard(() => after(delay))
}

/**
the timer is started when the Op is created
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
				if (out) {
					performed.resolve(idx)
					return true
				} else {
					return false
				}
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
