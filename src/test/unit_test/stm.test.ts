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
					if (v.isNone()) return
					sum.store(txn, v.unwrap() + 1)
				}),
			)
		}
		await Promise.all(tasks)

		await atomically((txn) => {
			const total = sum.load(txn)
			expect(total.isSome()).toBe(true)
			expect(total.unwrap()).toBe(1000)
		})
	})
})
