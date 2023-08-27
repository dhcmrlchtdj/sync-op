import {
	Channel,
	IVar,
	choose,
	never,
	type readableChannel,
} from "../../index.js"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* eslint-disable @typescript-eslint/no-floating-promises */

describe("search box", () => {
	test("debounce", async () => {
		const inputChan = new Channel<string>()

		const userInput = (async () => {
			inputChan.send("a").sync()
			inputChan.send("ap").sync()
			await sleep(10)
			inputChan.send("app").sync()
			inputChan.send("appl").sync()
			inputChan.send("apple").sync()

			await sleep(300)

			inputChan.send("o").sync()
			inputChan.send("or").sync()
			await sleep(10)
			inputChan.send("ora").sync()
			inputChan.send("oran").sync()
			inputChan.send("orang").sync()
			inputChan.send("orange").sync()

			await sleep(100)

			inputChan.send("b").sync()
			inputChan.send("ba").sync()
			await sleep(10)
			inputChan.send("ban").sync()
			inputChan.send("bana").sync()
			inputChan.send("banan").sync()
			inputChan.send("banana").sync()

			inputChan.close()
		})()

		const worker = (async () => {
			const t1 = import.meta.jest.fn()
			const t2 = import.meta.jest.fn()

			const slowOperation = async (
				input: string,
				signal: AbortSignal,
			) => {
				t1(input)
				await sleep(200 /*, { signal } */) // expensive operation
				if (signal.aborted) return ""
				t2(input)
				return input
			}

			const chOut = chain(inputChan, debounce(slowOperation, 50))

			expect(t1).toHaveBeenCalledTimes(0)
			expect(t2).toHaveBeenCalledTimes(0)

			expect((await chOut.receive().sync()).unwrap()).toBe("apple")

			expect(t1).toHaveBeenCalledTimes(1)
			expect(t2).toHaveBeenCalledTimes(1)

			expect((await chOut.receive().sync()).unwrap()).toBe("banana")

			expect(t1).toHaveBeenCalledTimes(3)
			expect(t2).toHaveBeenCalledTimes(2)

			expect((await chOut.receive().sync()).isNone()).toBe(true)

			expect(t1).toHaveBeenCalledTimes(3)
			expect(t2).toHaveBeenCalledTimes(2)
		})()

		await Promise.all([userInput, worker])

		function debounce<T, Args extends unknown[] = unknown[]>(
			f: (...arg: Args) => Promise<T> | T,
			ms: number,
		) {
			let cancel = (): void => undefined
			return (...arg: Args) => {
				cancel()
				const output = new IVar<T>()
				const tid = setTimeout(async () => {
					const v = await f(...arg)
					output.put(v)
				}, ms)
				cancel = () => clearTimeout(tid)
				return output
			}
		}

		function chain<T>(
			chIn: readableChannel<T>,
			op: (input: T, s: AbortSignal) => IVar<T>,
		): readableChannel<T> {
			const chOut = new Channel<T>()
			setTimeout(async () => {
				let input = await chIn.receive().sync()
				while (input.isSome()) {
					const ac = new AbortController()
					const output = op(input.unwrap(), ac.signal)

					const nextInput = choose(
						output
							.get()
							.wrapAbort(() => ac.abort())
							.wrap((v) => chOut.send(v).sync())
							.wrap(() => chIn.receive().sync()),
						chIn.isDrained()
							? never()
							: chIn
									.receive()
									.wrap((i) => (i.isSome() ? i : input)),
					)
					input = await nextInput.sync()
				}
				chOut.close()
			})
			return chOut
		}
	})
})
