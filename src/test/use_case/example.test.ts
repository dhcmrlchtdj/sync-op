import { describe, expect, test } from "@jest/globals"
import {
	Channel,
	always,
	choose,
	fromAbortSignal,
	fromPromise,
	guard,
	never,
	timeout,
} from "../../index.js"

describe("example", () => {
	test("unbuffered channel", async () => {
		const ch = new Channel<string>()

		const s = ch.send("hello").sync()
		const r = ch.receive().poll()

		expect(r.isSome()).toBe(true)
		expect(r.unwrap().isSome()).toBe(true)
		expect(r.unwrap().unwrap()).toBe("hello")

		await expect(s).resolves.toBe(true)
	})

	test("buffered channel", async () => {
		const ch = new Channel<number>(1) // buffered channel

		expect(ch.send(1).poll().isSome()).toBe(true)
		expect(ch.send(2).poll().isSome()).toBe(false)
		const s3 = ch.send(3).sync()

		expect(ch.receive().poll().isSome()).toBe(true)
		expect(ch.receive().poll().isSome()).toBe(true)
		expect(ch.receive().poll().isNone()).toBe(true)

		await expect(s3).resolves.toBe(true)

		ch.close()
		expect(ch.receive().poll().isSome()).toBe(true)
		expect(ch.receive().poll().unwrap().isNone()).toBe(true)
		expect(ch.isClosed()).toBe(true)
		expect(ch.isDrained()).toBe(true)
	})

	test("for await channel", async () => {
		const ch = new Channel<number>()

		const s1 = ch.send(1).sync()
		const s2 = ch.send(2).sync()
		const s3 = ch.send(3).sync()
		ch.close()

		expect(ch.isDrained()).toBe(false)

		const r = []
		for await (const msg of ch) {
			r.push(msg)
		}
		expect(r).toStrictEqual([1, 2, 3])

		expect(ch.isDrained()).toBe(true)
		await expect(s1).resolves.toBe(true)
		await expect(s2).resolves.toBe(true)
		await expect(s3).resolves.toBe(true)
	})

	test("choose", async () => {
		const c1 = new Channel<string>()
		const c2 = new Channel<number>()
		const c3 = new Channel<boolean>()

		const s1 = c1.send("hello").sync()
		const s2 = c2.send(1).sync()
		const s3 = c3.receive().sync()

		const op = choose(c1.receive(), c2.receive())
		const r1 = await op.sync()
		expect(r1.isSome()).toBe(true)
		expect([1, "hello"]).toContain(r1.unwrap())

		const r2 = await choose(c1.receive(), c2.receive()).sync()
		expect(r2.isSome()).toBe(true)
		expect([1, "hello"]).toContain(r2.unwrap())

		const r3 = await choose(op, c3.send(true)).sync()
		expect(r3).toBe(true) // c1/c2 is consumed

		await expect(s1).resolves.toBe(true)
		await expect(s2).resolves.toBe(true)
		expect((await s3).unwrap()).toBe(true)
	})

	test("always / never / wrap / timeout / fromAbortSignal", async () => {
		const ch = new Channel<number>()

		const r1 = choose(ch.receive(), always(1), never()).poll()
		expect(r1.isSome()).toBe(true)
		expect(r1.unwrap()).toBe(1)

		const r2 = await always(2)
			.wrap((x) => x * 2)
			.sync()
		expect(r2).toBe(4)

		const r3 = await choose(
			ch.receive(),
			timeout(10).wrap(() => "timeout"),
		).sync()
		expect(r3).toBe("timeout")

		const ac = new AbortController()
		setTimeout(() => ac.abort(), 10)
		const r4 = await choose(
			ch.receive(),
			fromAbortSignal(ac.signal).wrap(() => "abort"),
		).sync()
		expect(r4).toBe("abort")
	})

	test("fromPromise / guard", async () => {
		const r1 = await fromPromise(Promise.resolve(1)).sync()
		expect(r1).toBe(1)

		const r2 = fromPromise(Promise.reject("error"))
		await expect(r2.sync()).rejects.toBe("error")

		const timer = timeout(0).wrap(() => "timeout")
		const ac = new AbortController()
		const expensiveOp = guard(() => timeout(100)).wrapAbort(() =>
			ac.abort(),
		)
		const r3 = await choose(timer, expensiveOp).sync()
		expect(ac.signal.aborted).toBe(true)
		expect(r3).toBe("timeout")
	})
})
