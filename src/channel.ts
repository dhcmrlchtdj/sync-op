import { Deferred } from "./deferred.js"
import { always } from "./ext.js"
import { Op, Operation } from "./operation.js"
import { Option, some, none } from "./option.js"

export interface readableChannel<T> {
	isClosed(): boolean
	isDrained(): boolean
	receive(): Op<Option<T>>
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
	private _senders: Sender<T>[]
	private _receivers: Receiver<T>[]
	private _closed: boolean
	private _capacity: number
	private _buffer: Option<T>[] // [out ... in]

	/**
	create a new channel with buffer size `capacity`

	```typescript
	const unbuffered = new Channel()
	const buffered = new Channel(1)
	```
	*/
	constructor(capacity: number = 0) {
		this._senders = []
		this._receivers = []
		this._closed = false
		this._capacity = capacity
		this._buffer = []
	}

	close() {
		if (this._closed) return
		this._closed = true
		if (this._receivers.length > 0 && this._senders.length === 0) {
			this._receivers.forEach((r) => {
				r.performed.resolve(r.idx)
			})
		}
	}
	isClosed(): boolean {
		return this._closed
	}

	/**
	return `true` if the buffer is empty and there is no pending senders.
	*/
	isDrained(): boolean {
		if (!this._closed) return false
		return this._buffer.length === 0 && this._senders.length === 0
	}

	/**
	sends the message `data` to the channel.
	if the channel is closed, return `false`.

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
					while (this._receivers.length > 0) {
						const receiver = this._receivers.shift()!
						if (receiver.performed.isFulfilled) continue
						sender.sent = true
						performed.resolve(idx)
						receiver.data = sender.data
						receiver.performed.resolve(receiver.idx)
						return true
					}
					if (this._buffer.length < this._capacity) {
						this._buffer.push(some(data))
						sender.sent = true
						performed.resolve(idx)
						return true
					}
					return false
				},
				suspend: () => {
					const senders = this._senders.filter(
						(x) => !x.performed.isFulfilled,
					)
					senders.push(sender)
					this._senders = senders
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
					if (this._buffer.length > 0) {
						const data = this._buffer.shift()!
						receiver.data = data
						performed.resolve(idx)
						while (this._senders.length > 0) {
							const sender = this._senders.shift()!
							if (sender.performed.isFulfilled) continue
							this._buffer.push(sender.data)
							sender.sent = true
							sender.performed.resolve(sender.idx)
							break
						}
						return true
					}
					while (this._senders.length > 0) {
						const sender = this._senders.shift()!
						if (sender.performed.isFulfilled) continue
						receiver.data = sender.data
						performed.resolve(idx)
						sender.sent = true
						sender.performed.resolve(sender.idx)
						return true
					}
					if (this._closed) {
						performed.resolve(idx)
						return true
					}
					return false
				},
				suspend: () => {
					const receivers = this._receivers.filter(
						(x) => !x.performed.isFulfilled,
					)
					receivers.push(receiver)
					this._receivers = receivers
				},
				result: () => receiver.data,
			}
		})
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

/**
used to work with `for await...of`.

```typescript
const ch = new Channel()
for await (const msg of toIterator(ch)) {
	console.log(msg)
}
```
*/
export async function* toIterator<T>(c: readableChannel<T>): AsyncGenerator<T> {
	while (true) {
		const r = await c.receive().sync()
		if (r.isSome()) {
			yield r.unwrap()
		} else {
			return
		}
	}
}
