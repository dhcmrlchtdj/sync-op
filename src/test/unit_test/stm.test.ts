import { describe, expect, test } from "@jest/globals"
import { Var, atomically } from "../../stm"

describe("STM", () => {
	test("sum", async () => {
		const sum = new Var<number>()
		await atomically((txn) => {
			sum.store(txn, 0)
		})

		const tasks = []
		for (let i = 0; i < 1000; i++) {
			tasks.push(
				atomically((txn) => {
					const v = sum.load(txn)
					sum.store(txn, v + 1)
				}),
			)
		}
		await Promise.all(tasks)

		await atomically((txn) => {
			const total = sum.load(txn)
			expect(total).toBe(1000)
		})
	})
})
