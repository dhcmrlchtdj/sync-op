import { describe, expect, test } from "@jest/globals"
import { Channel } from "../../channel.js"

describe("unbuffered Channel", () => {
	test("receive", () => {
		const ch = new Channel<number>()

		const op = ch.receive()
		const r = op.poll()
		expect(r.isNone()).toBe(true)
	})

	test("send/receive", async () => {
		const ch = new Channel<number>()

		const bg = ch.send(1).sync()

		const op = ch.receive()
		const r = op.poll()
		expect(r.isSome()).toBe(true)
		expect(r.unwrap().isSome()).toBe(true)
		expect(r.unwrap().unwrap()).toBe(1)

		expect(await bg).toBe(true)
	})

	test("close/receive", () => {
		const ch = new Channel<number>()

		ch.close()
		expect(ch.isClosed()).toBe(true)
		expect(ch.isDrained()).toBe(true)

		const op = ch.receive()
		const r = op.poll()
		expect(r.isSome()).toBe(true)
		expect(r.unwrap().isNone()).toBe(true)
	})

	test("close/send", () => {
		const ch = new Channel<number>()

		ch.close()
		expect(ch.isClosed()).toBe(true)
		expect(ch.isDrained()).toBe(true)

		const op = ch.send(1)
		const r = op.poll()
		expect(r.isSome()).toBe(true)
		expect(r.unwrap()).toBe(false)
	})
})

describe("buffered Channel", () => {
	test("send", () => {
		const ch = new Channel<number>(1)
		const op = ch.send(1)
		const r = op.poll()
		expect(r.isSome()).toBe(true)
	})

	test("close/send/receive", () => {
		const ch = new Channel<number>(1)

		const op = ch.send(1)
		const r = op.poll()
		expect(r.isSome()).toBe(true)

		ch.close()
		expect(ch.isClosed()).toBe(true)
		expect(ch.isDrained()).toBe(false)

		const op2 = ch.receive()
		const r2 = op2.poll()
		expect(r2.isSome()).toBe(true)
		expect(r2.unwrap().isSome()).toBe(true)
		expect(r2.unwrap().unwrap()).toBe(1)

		expect(ch.isDrained()).toBe(true)

		const r3 = op2.poll()
		expect(r3.isSome()).toBe(true)
		expect(r3.unwrap().isNone()).toBe(true)
	})

	test("iterator", async () => {
		const ch = new Channel<number>(2)
		ch.send(1).poll()
		ch.send(2).poll()
		ch.close()

		const iter = ch[Symbol.asyncIterator]()
		expect(await iter.next()).toStrictEqual({ done: false, value: 1 })
		expect(await iter.next()).toStrictEqual({ done: false, value: 2 })
		expect(await iter.next()).toStrictEqual({
			done: true,
			value: undefined,
		})
	})
})
