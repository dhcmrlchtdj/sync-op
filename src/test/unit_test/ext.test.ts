import {
	always,
	never,
	fromPromise,
	fromAbortSignal,
	timeout,
	after,
	IVar,
	Mutex,
} from "../../ext.js"

describe("Operation Ext", () => {
	test("always", () => {
		const r = always(1).poll()
		expect(r.isSome()).toBe(true)
		expect(r.unwrap()).toBe(1)
	})

	test("never", () => {
		const r = never().poll()
		expect(r.isNone()).toBe(true)
	})

	test("fromPromise", async () => {
		const op = fromPromise(Promise.resolve(1))
		expect(op.poll().isNone()).toBe(true)
		const r = await op.sync()
		expect(r).toBe(1)
	})

	test("fromAbortSignal", async () => {
		const controller = new AbortController()
		const op = fromAbortSignal(controller.signal)
		expect(op.poll().isNone()).toBe(true)

		controller.abort("test")
		const r = await op.sync()
		expect(r).toBe("test")
	})

	test("timeout", async () => {
		const op = timeout(0).wrap(() => "timeout")
		expect(op.poll().isNone()).toBe(true)

		await new Promise((r) => setTimeout(r, 10))
		expect(op.poll().isNone()).toBe(true)

		const r = await op.sync()
		expect(r).toBe("timeout")
	})

	test("after", async () => {
		const op = after(0).wrap(() => "timeout")
		expect(op.poll().isNone()).toBe(true)

		await new Promise((r) => setTimeout(r, 10))
		expect(op.poll().isSome()).toBe(true)
	})

	test("Mutex", async () => {
		const mutex = new Mutex()

		expect(mutex.lock().poll().isSome()).toBe(true)
		expect(mutex.lock().poll().isNone()).toBe(true)

		let counter = 0
		const op = mutex.lock().wrap(() => counter++)
		const r = op.sync()
		expect(counter).toBe(0)

		mutex.unlock()

		await r
		expect(counter).toBe(1)
	})

	test("IVar", async () => {
		const iv = new IVar<number>()
		expect(iv.get().poll().isNone()).toBe(true)

		expect(iv.put(1)).toBe(true)
		expect(iv.put(2)).toBe(false)

		expect(iv.get().poll().isSome()).toBe(true)
		expect(await iv.get().sync()).toBe(1)
	})
})
