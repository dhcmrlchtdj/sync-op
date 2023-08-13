import { Channel } from "../../index.js"

describe("iterator", () => {
	test("wrap", async () => {
		function wrap<In, Out = unknown>(
			fn: (_: (val: In) => Promise<Out>) => Promise<void>,
		) {
			return async function* g(): Omit<
				AsyncGenerator<In, void, Out>,
				"return"
			> {
				const chIn = new Channel<In>()
				const chOut = new Channel<{ val: Out } | { err: unknown }>()

				fn(async (data) => {
					await chIn.send(data).sync()
					const out = (await chOut.receive().sync()).unwrap()
					if ("val" in out) {
						return out.val
					} else {
						throw out.err
					}
				}).finally(() => chIn.close())

				while (!chIn.isDrained()) {
					const _in = await chIn.receive().sync()
					if (_in.isSome()) {
						let _out
						try {
							const val = yield _in.value
							_out = { val }
						} catch (err) {
							_out = { err }
						}
						await chOut.send(_out).sync()
					} else {
						return
					}
				}
			}
		}

		const gen = wrap<string>(async (Yield) => {
			try {
				await Yield("hello")
			} catch (e) {
				expect(e).toBe("err")
			}
			await (() => Yield(","))()
			await (() => Yield("world"))()
			await Yield("!")
		})
		const g = gen()
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(await g.throw("err")).toStrictEqual({ done: false, value: "," })
		expect(await g.next()).toStrictEqual({ done: false, value: "world" })
		expect(await g.next()).toStrictEqual({ done: false, value: "!" })
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
	})
})
