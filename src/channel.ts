import { Deferred } from "./deferred.js"
import { always } from "./helper.js"
import { Op, Operation } from "./operation.js"
import { Option, some, none } from "./option.js"

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

export class Channel<T> {
	private _senders: Sender<T>[]
	private _receivers: Receiver<T>[]
	private _closed: boolean
	constructor() {
		this._senders = []
		this._receivers = []
		this._closed = false
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
						receiver.data = sender.data
						performed.resolve(idx)
						sender.sent = true
						receiver.performed.resolve(receiver.idx)
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
	receive(): Op<Option<T>> {
		if (this._closed) return always(none)
		return new Operation((performed, idx) => {
			const receiver: Receiver<T> = {
				performed,
				idx,
				data: none,
			}
			return {
				poll: () => {
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

export async function* toIterator<T>(c: Channel<T>): AsyncGenerator<T> {
	while (true) {
		const r = await c.receive().sync()
		if (r.isNone()) return
		yield r.unwrap()
	}
}
