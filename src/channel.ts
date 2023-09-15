import { Deferred } from "./deferred.js"
import { always } from "./extension.js"
import { Operation, type Op } from "./operation.js"
import { none, some, type Option } from "./option.js"

export interface readableChannel<T> {
	isClosed(): boolean
	isDrained(): boolean
	receive(): Op<Option<T>>
	[Symbol.asyncIterator](): AsyncGenerator<T>
}

export interface writableChannel<T> {
	isClosed(): boolean
	isDrained(): boolean
	send(data: T): Op<boolean>
	close(): void
}

/**
the synchronous channel
*/
export class Channel<T> implements readableChannel<T>, writableChannel<T> {
	private _receivers: Receiver<T>[]
	private _senders: Sender<T>[]
	private _buffer: Option<T>[] // [out ... in]
	private _capacity: number
	private _closed: boolean

	/**
	create a new channel with buffer size `capacity`

	```typescript
	const unbuffered = new Channel()
	const buffered = new Channel(1)
	```
	*/
	constructor(capacity: number = 0) {
		this._receivers = []
		this._senders = []
		this._buffer = []
		this._capacity = capacity
		this._closed = false
	}

	private _cleanupFulfilled<X extends { performed: Deferred<number> }>(
		arr: X[],
	): X[] {
		return arr.filter((x) => !x.performed.isFulfilled)
	}

	close() {
		if (this._closed) return
		this._closed = true

		this._senders = this._cleanupFulfilled(this._senders)
		this._receivers = this._cleanupFulfilled(this._receivers)
		const pendingSend = this._buffer.length + this._senders.length
		for (let i = pendingSend, len = this._receivers.length; i < len; i++) {
			const r = this._receivers[i]!
			r.performed.resolve(r.idx)
		}
	}
	isClosed(): boolean {
		return this._closed
	}

	/**
	returns `true` if the buffer is empty and there are no pending senders.
	*/
	isDrained(): boolean {
		if (!this._closed) return false
		if (this._buffer.length > 0) return false
		if (this._senders.length === 0) return true
		this._senders = this._cleanupFulfilled(this._senders)
		return this._senders.length === 0
	}

	/**
	sends the `data` message to the channel.
	if channel is closed, return `false`.

	```typescript
	const op = ch.send("hello world")
	await op.sync()
	```
	*/
	send(data: T): Op<boolean> {
		if (this._closed) return always(false)
		return new Operation((performed, idx) => {
			const sender: Sender<T> = {
				performed,
				idx,
				data: some(data),
				sent: false,
			}
			return {
				poll: () => {
					this._receivers = this._cleanupFulfilled(this._receivers)
					if (this._closed) {
						performed.resolve(idx)
					} else if (this._receivers.length > 0) {
						const receiver = this._receivers.shift()!
						receiver.data = sender.data
						receiver.performed.resolve(receiver.idx)
						sender.sent = true
						performed.resolve(idx)
					} else if (this._buffer.length < this._capacity) {
						this._buffer.push(some(data))
						sender.sent = true
						performed.resolve(idx)
					}
				},
				suspend: () => {
					this._senders.push(sender)
					this._senders = this._cleanupFulfilled(this._senders)
				},
				result: () => sender.sent,
			}
		})
	}

	/**
	receives a message from the channel.
	if the channel is drained, return `none`.

	```typescript
	const op = ch.receive()
	const msg = await op.sync()
	```
	*/
	receive(): Op<Option<T>> {
		if (this.isDrained()) return always(none)
		return new Operation((performed, idx) => {
			const receiver: Receiver<T> = {
				performed,
				idx,
				data: none,
			}
			return {
				poll: () => {
					this._senders = this._cleanupFulfilled(this._senders)
					if (this._buffer.length > 0) {
						const data = this._buffer.shift()!
						receiver.data = data
						performed.resolve(idx)
						if (this._senders.length > 0) {
							const sender = this._senders.shift()!
							this._buffer.push(sender.data)
							sender.sent = true
							sender.performed.resolve(sender.idx)
						}
					} else if (this._senders.length > 0) {
						const sender = this._senders.shift()!
						sender.sent = true
						sender.performed.resolve(sender.idx)
						receiver.data = sender.data
						performed.resolve(idx)
					} else if (this._closed) {
						performed.resolve(idx)
					}
				},
				suspend: () => {
					this._receivers.push(receiver)
					this._receivers = this._cleanupFulfilled(this._receivers)
				},
				result: () => receiver.data,
			}
		})
	}

	/**
	```typescript
	const ch = new Channel()
	ch.send(1)
	ch.close()
	for await (const msg of ch) {
		console.log(msg)
	}
	```
	*/
	async *[Symbol.asyncIterator]() {
		while (true) {
			const r = await this.receive().sync()
			if (r.isSome()) {
				yield r.unwrap()
			} else {
				return
			}
		}
	}
}

type Sender<T> = {
	performed: Deferred<number>
	idx: number
	data: Option<T>
	sent: boolean
}

type Receiver<T> = {
	performed: Deferred<number>
	idx: number
	data: Option<T>
}
