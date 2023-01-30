import {
	always,
	never,
	fromPromise,
	fromAbortSignal,
	fromTimeout,
} from "../../ext.js"

describe("Operation Ext", () => {
	test("always", () => {
		const r = always(1).poll()
		expect(r.isSome()).toBe(true)
		expect(r.unwrap()).toBe(1)
	})

	test("never", () => {
		const r = never().poll()
		expect(r.isSome()).toBe(false)
	})

	test("fromPromise", async () => {
		const op = fromPromise(Promise.resolve(1))
		expect(op.poll().isSome()).toBe(false)
		const r = await op.sync()
		expect(r).toBe(1)
	})

	test("fromAbortSignal", async () => {
		const controller = new AbortController()
		const op = fromAbortSignal(controller.signal)
		expect(op.poll().isSome()).toBe(false)

		controller.abort("test")
		const r = await op.sync()
		expect(r).toBe("test")
	})

	test("fromTimeout", async () => {
		const op = fromTimeout(10).wrap(() => "timeout")
		expect(op.poll().isSome()).toBe(false)

		const r = await op.sync()
		expect(r).toBe("timeout")
	})
})
