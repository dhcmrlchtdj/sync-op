import { Op, Operation, guard } from "./operation.js"

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
			suspend: () => {},
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
			suspend: () => {},
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
const noop = () => {}
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
the timer is started when it's be polled.
*/
export function fromTimeout(delay: number): Op<unknown> {
	return guard(() => fromAbortSignal(AbortSignal.timeout(delay)))
}
