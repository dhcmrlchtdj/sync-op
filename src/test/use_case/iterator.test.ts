import { Channel } from "../../index.js"

describe("iterator", () => {
	test("wrap", async () => {
		function wrap<In, Out = unknown>(
			f: (push: (_: In) => Promise<Out>) => Promise<void>,
		) {
			return async function* g(): AsyncGenerator<In, void, Out> {
				const chIn = new Channel<In>()
				const chOut = new Channel<Out>()

				f(async (data) => {
					await chIn.send(data).sync()
					const out = chOut.receive().sync()
					return out.then((o) => o.unwrap())
				}).finally(() => chIn.close())

				while (!chIn.isDrained()) {
					const _in = await chIn.receive().sync()
					if (_in.isSome()) {
						const _out = yield _in.value
						await chOut.send(_out).sync()
					} else {
						return
					}
				}
			}
		}

		const gen = wrap<string>(async (Yield) => {
			await Yield("hello")
			await (() => Yield(","))()
			await (() => Yield("world"))()
			await Yield("!")
		})
		const g = gen()
		expect(await g.next()).toStrictEqual({ done: false, value: "hello" })
		expect(await g.next()).toStrictEqual({ done: false, value: "," })
		expect(await g.next()).toStrictEqual({ done: false, value: "world" })
		expect(await g.next()).toStrictEqual({ done: false, value: "!" })
		expect(await g.next()).toStrictEqual({ done: true, value: undefined })
	})
})
