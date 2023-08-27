import { Channel } from "./channel.js"
import { Deferred } from "./deferred.js"
import { noop } from "./noop.js"

export type YieldFn<In = unknown, Out = void> = (_: In) => Promise<Out>
export type GenFn<In = unknown, Out = void, Return = void> = (
	Yield: YieldFn<In, Out>,
) => Promise<Return>

export function generator<In = unknown, Out = void, Return = void>(
	fn: GenFn<In, Out, Return>,
) {
	type Result =
		| { done: false; value: In }
		| { done: true; value: Return | undefined }

	const _chOut = new Channel<Result>()
	const _chIn = new Channel<
		{ val: Out } | { ret: Return } | { err: unknown }
	>()
	const _close = () => {
		_chIn.close()
		_chOut.close()
	}

	const _start = new Deferred()
	const _next = async (val: Out): Promise<Result> => {
		if (_start.isFulfilled) {
			_chIn.send({ val }).sync().catch(noop)
		} else if (!_chIn.isClosed()) {
			_start.resolve()
		}

		const out = await _chOut.receive().sync()
		if (out.isSome()) {
			return out.value
		} else {
			return {
				done: true,
				value: undefined,
			}
		}
	}
	const _return = (ret: Return): Promise<Result> => {
		_close()
		return Promise.resolve({ done: true, value: ret })
	}
	const _throw = async (err?: unknown): Promise<Result> => {
		if (_start.isFulfilled) {
			_chIn.send({ err }).sync().catch(noop)
			const out = await _chOut.receive().sync()
			if (out.isSome()) {
				return out.value
			} else {
				throw err
			}
		} else {
			_close()
			throw err
		}
	}
	_start.promise
		.then(() =>
			fn(async (data) => {
				_chOut.send({ done: false, value: data }).sync().catch(noop)
				const inOpt = await _chIn.receive().sync()
				if (inOpt.isSome()) {
					const val = inOpt.value
					if ("val" in val) {
						return val.val
					} else if ("err" in val) {
						throw val.err
					} else if ("ret" in val) {
						_chOut
							.send({ done: true, value: val.ret })
							.sync()
							.catch(noop)
						_close()
					}
				}
				return new Promise(noop)
			})
				.then((value) =>
					_chOut.send({ done: true, value: value }).sync(),
				)
				.finally(() => _close()),
		)
		.catch(noop)

	const iterator = {
		next: _next,
		return: _return,
		throw: _throw,
		[Symbol.asyncIterator]: () => iterator,
	}
	return iterator
}
