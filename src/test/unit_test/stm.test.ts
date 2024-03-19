import { describe, expect, test } from "@jest/globals"
import { Var, atomically } from "../../stm"
import { Var as Var2, atomically as atomically2 } from "../../stm2"

describe("STM", () => {
	test("sum", async () => {
		const sum = new Var<number>(0)

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

describe("STM2", () => {
	test("sum", async () => {
		const sum = new Var2<number>(0)

		const tasks = []
		for (let i = 0; i < 1000; i++) {
			tasks.push(
				atomically2((txn) => {
					const v = txn.load(sum)
					txn.store(sum, v + 1)
					txn.commit()
				}),
			)
		}
		await Promise.all(tasks)

		const total = await atomically2((txn) => txn.load(sum))
		expect(total).toBe(1000)
	})
})
