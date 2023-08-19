import { Channel, Deferred } from "../../index.js"

type Out<T1, T2> =
	| { done: false; value: T1 }
	| { done: true; value: T2 | undefined }

function wrap<Tyield = unknown, Tnext = void, Treturn = void>(
	fn: (Yield: (_: Tyield) => Promise<Tnext>) => Promise<Treturn>,
) {
	const _chOut = new Channel<Out<Tyield, Treturn>>()
	const _chIn = new Channel<
		{ val: Tnext } | { ret: Treturn } | { err: unknown }
	>()
	const _close = () => {
		_chIn.close()
		_chOut.close()
	}

	const _start = new Deferred()
	const _next = async (val: Tnext): Promise<Out<Tyield, Treturn>> => {
		if (_start.isFulfilled) {
			_chIn
				.send({ val })
				.sync()
				.catch(() => {})
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
	const _return = (ret: Treturn): Promise<Out<Tyield, Treturn>> => {
		_close()
		return Promise.resolve({ done: true, value: ret })
	}
	const _throw = async (err?: unknown): Promise<Out<Tyield, Treturn>> => {
		if (_start.isFulfilled) {
			_chIn
				.send({ err })
				.sync()
				.catch(() => {})
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
							.send({ done: true, value: val.ret })
							.sync()
							.catch(() => {})
						_close()
					}
				}
				return new Promise((_) => {})
			})
				.then((value) =>
					_chOut.send({ done: true, value: value }).sync(),
				)
				.finally(() => _close()),
		)
		.catch(() => {})

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
		const t = import.meta.jest.fn()
		const g = wrap<string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
			await (() => Yield("world"))()
			t(3)
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(await g.next()).toStrictEqual({ done: false, value: "world" })
		expect(t).toHaveBeenLastCalledWith(2)
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenLastCalledWith(3)
		expect(t).toHaveBeenCalledTimes(3)
	})
	test("return 1", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string, void, string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
			return "world"
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(await g.next()).toStrictEqual({ done: true, value: "world" })
		expect(t).toHaveBeenLastCalledWith(2)
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenCalledTimes(2)
	})
	test("return 2", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string, void, string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
			await Yield("world")
			t(3)
			return "!"
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(await g.return("return")).toStrictEqual({
			done: true,
			value: "return",
		})
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(await g.return("again")).toStrictEqual({
			done: true,
			value: "again",
		})
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(t).toHaveBeenCalledTimes(1)
	})
	test("return 3", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string, void, string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
			await Yield("world")
			t(3)
			return "!"
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.return("return")).toStrictEqual({
			done: true,
			value: "return",
		})
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenCalledTimes(0)
	})
	test("throw 1", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string>(async (Yield) => {
			t(1)
			try {
				await Yield("hello")
			} catch (e) {
				t(2)
				expect(e).toBe("err")
			}
			await Yield("world")
			t(3)
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(await g.throw("err")).toStrictEqual({
			done: false,
			value: "world",
		})
		expect(t).toHaveBeenLastCalledWith(2)
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenLastCalledWith(3)
		expect(t).toHaveBeenCalledTimes(3)
	})
	test("throw 2", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string, void, string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
			await Yield("world")
			t(3)
			return "!"
		})
		expect(t).toHaveBeenCalledTimes(0)
		await expect(g.throw("A")).rejects.toBe("A")
		await expect(g.throw("B")).rejects.toBe("B")
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(await g.return("C")).toStrictEqual({ done: true, value: "C" })
		expect(t).toHaveBeenCalledTimes(0)
	})
	test("throw 3", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string>(async (Yield) => {
			t(1)
			await Yield("hello")
			t(2)
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.return()).toStrictEqual({ done: true, value: undefined })
		await expect(g.throw("err")).rejects.toBe("err")
		expect(t).toHaveBeenCalledTimes(0)
	})
	test("yield", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<string, number>(async (Yield) => {
			t(1)
			const x1 = await Yield("hello")
			expect(x1).toBe(2)
			t(2)
			const x2 = await Yield("world")
			expect(x2).toBe(3)
			t(3)
		})
		expect(t).toHaveBeenCalledTimes(0)
		expect(await g.next(1)).toStrictEqual({ done: false, value: "hello" })
		expect(t).toHaveBeenLastCalledWith(1)
		expect(await g.next(2)).toStrictEqual({ done: false, value: "world" })
		expect(t).toHaveBeenLastCalledWith(2)
		expect(await g.next(3)).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenLastCalledWith(3)
		expect(t).toHaveBeenCalledTimes(3)
	})
	test("for...of", async () => {
		const t = import.meta.jest.fn()
		const g = wrap<number>(async (Yield) => {
			t(1)
			await Yield(1)
			t(2)
			await Yield(2)
			t(3)
			await Yield(3)
			t(4)
		})
		const collect: number[] = []
		expect(t).toHaveBeenCalledTimes(0)
		for await (const x of g) {
			collect.push(x)
			expect(t).toHaveBeenLastCalledWith(collect.length)
		}
		expect(collect).toStrictEqual([1, 2, 3])
		expect(t).toHaveBeenLastCalledWith(4)
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
		expect(t).toHaveBeenCalledTimes(4)
	})
})
