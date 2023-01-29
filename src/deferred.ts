export class Deferred<T = void> {
	promise: Promise<T>
	isFulfilled: boolean
	isResolved: boolean
	isRejected: boolean
	// @ts-expect-error
	resolve: (payload: T | PromiseLike<T>) => void
	// @ts-expect-error
	reject: (err?: unknown) => void

	constructor() {
		this.isFulfilled = false
		this.isResolved = false
		this.isRejected = false
		this.promise = new Promise((resolve, reject) => {
			this.resolve = (payload: T | PromiseLike<T>) => {
				if (this.isFulfilled) return
				this.isFulfilled = true
				this.isResolved = true
				resolve(payload)
			}
			this.reject = (err?: unknown) => {
				if (this.isFulfilled) return
				this.isFulfilled = true
				this.isRejected = true
				reject(err)
			}
		})
	}
}
