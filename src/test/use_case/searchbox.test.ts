import { Channel, IVar, choose } from "../../index.js"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

describe("search box", () => {
	test("debounce && cancel", async () => {
		const inputChan = new Channel<string>()

		const userInput = (async () => {
			/* eslint-disable @typescript-eslint/no-floating-promises */
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
			await inputChan.send("banana").sync()
			/* eslint-enable @typescript-eslint/no-floating-promises */

			inputChan.close()
		})()

		const someSlowOperation = async (
			input: string,
			done: (r: string) => void,
			signal: AbortSignal,
		) => {
			if (signal.aborted) return

			await sleep(50) // debounce
			if (signal.aborted) return
			expect(["apple", "orange", "banana"]).toContainEqual(input)

			await sleep(200 /*, { signal } */) // expensive operation
			if (signal.aborted) return
			expect(["apple", "banana"]).toContainEqual(input)

			done(input)
		}

		const worker = (async () => {
			const responses = []
			while (!inputChan.isDrained()) {
				let input = await inputChan.receive().sync()
				if (input.isNone()) break

				while (true) {
					const output = new IVar<string>()
					const ac = new AbortController()
					/* eslint-disable-next-line @typescript-eslint/no-floating-promises */
					someSlowOperation(
						input.unwrap(),
						(v: string) => output.put(v),
						ac.signal,
					)

					if (inputChan.isDrained()) {
						const v = await output.get().sync()
						responses.push(v)
						break
					} else {
						const breakInnerLoop = await choose(
							inputChan.receive().wrap((i) => {
								// if i.isSome(), just replace `input` with new value, and then restart the lopp
								// if i.isNone(), the `input` is the latest value, we should wait for the result
								// but the operation is aborted, so we need to restart the loop with current value
								if (i.isSome()) input = i
								return false
							}),
							output
								.get()
								.wrapAbort(() => ac.abort())
								.wrap((v) => {
									responses.push(v)
									return true
								}),
						).sync()
						if (breakInnerLoop) break
					}
				}
			}
			expect(responses).toStrictEqual(["apple", "banana"])
		})()

		await Promise.all([userInput, worker])
	})
})
