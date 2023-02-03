import { choose, select, guard } from "../../operation.js"
import { always } from "../../extension.js"

describe("Operation", () => {
	test("choose", () => {
		let counter = 0
		const op = choose(
			always(1).wrapAbort(() => counter++),
			always(2).wrapAbort(() => counter++),
		)
		const r = op.poll()
		expect(r.isSome()).toBe(true)
		expect([1, 2]).toContain(r.unwrap())
		expect(counter).toBe(1)
	})

	test("select", async () => {
		const r = await select(always(1), always(2))
		expect([1, 2]).toContain(r)
	})

	test("guard", () => {
		let counter = 0
		const op = guard(() => {
			counter++
			return always(1)
		})
		expect(counter).toBe(0)

		op.poll()
		expect(counter).toBe(1)

		op.poll()
		expect(counter).toBe(2)
	})
})
