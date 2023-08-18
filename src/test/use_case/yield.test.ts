import { Channel, Deferred } from "../../index.js"

function wrap<Tyield, Treturn = void, Tnext = void>(
	fn: (Yield: (_: Tyield) => Promise<Tnext | undefined>) => Promise<Treturn>,
) {
	const _chOut = new Channel<IteratorResult<Tyield, Treturn>>()
	const _chIn = new Channel<
		| { val: Tnext | undefined }
		| { ret: Treturn | undefined }
		| { err: unknown }
	>()

	const _start = new Deferred()
	const _send = async (
		data:
			| { val: Tnext | undefined }
			| { ret: Treturn | undefined }
			| { err: unknown },
	): Promise<IteratorResult<Tyield, Treturn>> => {
		if (_start.isFulfilled) {
			_chIn
				.send(data)
				.sync()
				.catch(() => {})
		} else {
			_start.resolve()
		}
		const out = await _chOut.receive().sync()
		if (out.isSome()) {
			return out.value
		} else {
			_chIn.close()
			return {
				done: true,
				value: undefined as Treturn,
			}
		}
	}
	const _next = (val?: Tnext) => _send({ val })
	const _return = (ret?: Treturn) => _send({ ret })
	const _throw = (err?: unknown) => _send({ err })
	_start.promise
		.then(() =>
			fn(async (data) => {
				_chOut
					.send({ done: false, value: data })
					.sync()
					.catch(() => {})
				const inOpt = await _chIn.receive().sync()
				if (inOpt.isSome()) {
					const val = inOpt.value
					if ("val" in val) {
						return val.val
					} else if ("err" in val) {
						throw val.err
					} else if ("ret" in val) {
						_chOut
							.send({ done: true, value: val.ret as Treturn })
							.sync()
							.catch(() => {})
						_chOut.close()
					}
				}
				return new Promise((_) => {})
			}).then((value) =>
				_chOut.send({ done: true, value: value }).sync(),
			),
		)
		.finally(() => _chOut.close())

	const iterator = {
		next: _next,
		return: _return,
		throw: _throw,
		[Symbol.asyncIterator]: () => iterator,
	}
	return iterator
}

describe("yield", () => {
	test("next", async () => {
		const g = wrap<string>(async (Yield) => {
			await Yield("hello")
			await (() => Yield("world"))()
		})
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(await g.next()).toStrictEqual({ done: false, value: "world" })
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
	})
	test("return", async () => {
		const g = wrap<string, string>(async (Yield) => {
			await Yield("hello")
			return "world"
		})
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(await g.next()).toStrictEqual({ done: true, value: "world" })
	})
	test("throw", async () => {
		const g = wrap<string>(async (Yield) => {
			try {
				await Yield("hello")
			} catch (e) {
				expect(e).toBe("err")
			}
			await Yield("world")
		})
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(await g.throw("err")).toStrictEqual({
			done: false,
			value: "world",
		})
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
	})
	test("yield", async () => {
		const g = wrap<string, void, number>(async (Yield) => {
			const x1 = await Yield("hello")
			expect(x1).toBe(2)
			const x2 = await Yield("world")
			expect(x2).toBe(3)
		})
		expect(await g.next(1)).toStrictEqual({ done: false, value: "hello" })
		expect(await g.next(2)).toStrictEqual({ done: false, value: "world" })
		expect(await g.next(3)).toStrictEqual({ done: true, value: undefined })
	})
	test("for...of", async () => {
		const g = wrap<number>(async (Yield) => {
			await Yield(1)
			await Yield(2)
			await Yield(3)
		})
		const collect: number[] = []
		for await (const x of g) {
			collect.push(x)
		}
		expect(collect).toStrictEqual([1, 2, 3])
	})
})
