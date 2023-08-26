import { Channel, IVar, choose, never } from "../../index.js"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* eslint-disable @typescript-eslint/no-floating-promises */

describe("search box", () => {
	test("debounce && cancel", async () => {
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
			const responses: string[] = []

			const slowOp = debounce(slowOperation, 50)

			let input = await inputChan.receive().sync()
			while (input.isSome()) {
				const ac = new AbortController()
				const output = slowOp(input.unwrap(), ac.signal)

				const nextInput = choose(
					output
						.get()
						.wrapAbort(() => ac.abort())
						.wrap((v) => responses.push(v))
						.wrap(() => inputChan.receive().sync()),
					inputChan.isDrained()
						? never()
						: inputChan
								.receive()
								.wrap((i) => (i.isSome() ? i : input)),
				)
				input = await nextInput.sync()
			}

			expect(responses).toStrictEqual(["apple", "banana"])
		})()

		await Promise.all([userInput, worker])

		async function slowOperation(
			input: string,
			signal: AbortSignal,
		): Promise<string> {
			expect(["apple", "orange", "banana"]).toContainEqual(input)

			await sleep(200 /*, { signal } */) // expensive operation
			if (signal.aborted) return ""

			expect(["apple", "banana"]).toContainEqual(input)

			return input
		}

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
	})
})
