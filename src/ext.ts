import { Op, Operation, guard } from "./operation.js"

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

export function fromPromise<T>(p: Promise<T>): Op<Promise<T>> {
	let fulfilled = false
	p.finally(() => (fulfilled = true))
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
				p.finally(() => performed.resolve(idx))
			},
			result: () => p,
		}
	})
}

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

export function fromTimeout(delay: number): Op<unknown> {
	return guard(() => fromAbortSignal(AbortSignal.timeout(delay)))
}
