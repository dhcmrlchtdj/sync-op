import { Channel, IVar, choose, timeout } from "../../index.js"

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
		})()

		const worker = (async () => {
			const getInputDebounce = async (input: string, wait: number) => {
				expect(["a", "o", "b"]).toContainEqual(input)
				let done = false
				while (!done) {
					done = await choose(
						timeout(wait).wrap(() => true),
						inputChan
							.receive()
							.wrap((v) => (input = v.unwrap()))
							.wrap(() => false),
					).sync()
				}
				return input
			}

			const search = (
				input: string,
			): {
				resp: IVar<string>
				cancel: () => void
			} => {
				const resp = new IVar<string>()
				let canceled = false
				const cancel = () => {
					canceled = true
				}

				/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/no-unnecessary-condition */
				;(async () => {
					await sleep(200)
					if (canceled) return
					resp.put(input)
				})()
				/* eslint-enable @typescript-eslint/no-floating-promises, @typescript-eslint/no-unnecessary-condition */

				return { resp, cancel }
			}

			const responses = []
			for (let i = 0; i < 2; i++) {
				let input = (await inputChan.receive().sync()).unwrap()
				while (true) {
					input = await getInputDebounce(input, 50)
					expect(["apple", "orange", "banana"]).toContainEqual(input)

					const { resp, cancel } = search(input)

					const done = await choose(
						inputChan.receive().wrap((i) => {
							input = i.unwrap()
							return false
						}),
						resp
							.get()
							.wrapAbort(() => cancel())
							.wrap(() => true),
					).sync()

					if (done) {
						const output = await resp.get().sync()
						responses.push(output)
						break
					}
				}
			}
			expect(responses).toEqual(["apple", "banana"])
		})()

		await Promise.all([userInput, worker])
	})
})
