import { Channel } from "./channel.js"
import { Deferred } from "./deferred.js"
import { noop } from "./noop.js"

export type YieldFn<In = unknown, Out = void> = (_: In) => Promise<Out>

export function generator<In = unknown, Out = void, Return = void>(
	fn: (Yield: YieldFn<In, Out>) => Return | Promise<Return>,
) {
	type Result =
		| { done: false; value: In }
		| { done: true; value: Return | undefined }

	const _chOut = new Channel<Result>()
	const _chIn = new Channel<{ val: Out } | { err: unknown }>()
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
			// eslint-disable-next-line no-promise-in-callback
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
	const _yield = async (data: In): Promise<Out> => {
		_chOut.send({ done: false, value: data }).sync().catch(noop)
		const inOpt = await _chIn.receive().sync()
		if (inOpt.isSome()) {
			const val = inOpt.value
			if ("val" in val) {
				return val.val
			} else {
				throw val.err
			}
		}
		return new Promise(noop)
	}
	_start.promise
		.then(() => fn(_yield))
		.then((value) => _chOut.send({ done: true, value: value }).sync())
		.finally(() => _close())
		.catch(noop)

	const iterator = {
		next: _next,
		return: _return,
		throw: _throw,
		[Symbol.asyncIterator]: () => iterator,
	}
	return iterator
}
