import { describe, expect, test } from "@jest/globals"
import {
	IVar,
	MVar,
	Mutex,
	Semaphore,
	WaitGroup,
	always,
	fromAbortSignal,
	fromPromise,
	never,
	timeout,
	timeoutImmediate,
} from "../../extension.js"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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
		expect(await op.sync()).toBe(1)

		const op2 = fromPromise(Promise.resolve(2))
		await sleep(10)
		expect(op2.poll().isSome()).toBe(true)
		expect(await op2.poll().unwrap()).toBe(2)

		const op3 = fromPromise(Promise.reject(3))
		expect(op3.poll().isNone()).toBe(true)
		await expect(op3.sync()).rejects.toBe(3)
	})

	test("fromAbortSignal", async () => {
		const controller = new AbortController()
		const op = fromAbortSignal<string>(controller.signal)
		expect(op.poll().isNone()).toBe(true)

		controller.abort("test")
		const r = await op.sync()
		expect(r).toBe("test")
	})

	test("timeout", async () => {
		const op = timeout(0).wrap(() => "timeout")
		expect(op.poll().isNone()).toBe(true)

		await sleep(10)
		expect(op.poll().isNone()).toBe(true)

		const r = await op.sync()
		expect(r).toBe("timeout")
	})

	test("timeoutImmediate", async () => {
		const op = timeoutImmediate(10).wrap(() => "timeout")
		expect(op.poll().isNone()).toBe(true)

		const r = op.sync()

		await new Promise((r) => setTimeout(r, 20))
		expect(op.poll().isSome()).toBe(true)
		expect(await r).toBe("timeout")
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

		expect(mutex.lock().poll().isNone()).toBe(true)
		mutex.unlock()
		expect(mutex.lock().poll().isSome()).toBe(true)
	})

	test("Semaphore", async () => {
		const sema = new Semaphore(2)

		expect(sema.lock().poll().isSome()).toBe(true)
		expect(sema.lock().poll().isSome()).toBe(true)
		expect(sema.lock().poll().isNone()).toBe(true)

		let counter = 0
		const op = sema.lock().wrap(() => counter++)
		const r = op.sync()
		expect(counter).toBe(0)

		sema.unlock()

		await r
		expect(counter).toBe(1)

		expect(sema.lock().poll().isNone()).toBe(true)
		sema.unlock()
		expect(sema.lock().poll().isSome()).toBe(true)
	})

	test("IVar", async () => {
		const iv = new IVar<number>()
		expect(iv.get().poll().isNone()).toBe(true)
		const r = expect(iv.get().sync()).resolves.toBe(1)

		expect(iv.put(1)).toBe(true)
		expect(iv.put(2)).toBe(false)

		expect(iv.get().poll().isSome()).toBe(true)
		expect(await iv.get().sync()).toBe(1)

		await r
	})

	test("MVar", async () => {
		const mv = new MVar<number>()
		expect(mv.get().poll().isSome()).toBe(false)
		const r = expect(mv.take().sync()).resolves.toBe(1)

		expect(mv.put(1)).toBe(true)
		await r

		expect(mv.put(2)).toBe(true)
		expect(mv.put(3)).toBe(false)

		expect(mv.get().poll().isSome()).toBe(true)
		expect(await mv.get().sync()).toBe(2)

		expect(await mv.swap(4).sync()).toBe(2)
		expect(await mv.get().sync()).toBe(4)

		expect(await mv.take().sync()).toBe(4)
		expect(mv.get().poll().isNone()).toBe(true)
	})

	test("WaitGroup", () => {
		const wg = new WaitGroup()
		expect(wg.wait().poll().isSome()).toBe(true)

		wg.add()
		expect(wg.wait().poll().isSome()).toBe(false)

		wg.done()
		expect(wg.wait().poll().isSome()).toBe(true)
	})
})
