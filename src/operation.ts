// based on https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml

import { Deferred } from "./deferred.js"
import { Option, some, none } from "./option.js"

export type BasicOp<T> = {
	poll(): boolean
	suspend(): void
	result(): T
}

export type OpBuilder<T> = (
	performed: Deferred<number>,
	idx: number,
) => BasicOp<T>

type GenOp<T> = { builder: OpBuilder<T>; shouldNotAbort: number[] }

type AbortMap = Map<number, () => void> // map id to onAbort

///

let id = 0
const genSym = () => id++

function randomize<T>(arr: T[]): T[] {
	return [...arr].sort(() => Math.random() - 0.5)
}

///

/**
the first-class sychronous operations
*/
export abstract class Op<T> {
	/**
	synchronizes on the Op
	*/
	sync(): Promise<T> {
		const { genOps, abortMap } = this.flatten([], [], new Map())
		return basicSync(abortMap, randomize(genOps))
	}
	/**
	non-blocking version of `Op#sync`
	*/
	poll(): Option<T> {
		const { genOps, abortMap } = this.flatten([], [], new Map())
		return basicPoll(abortMap, randomize(genOps))
	}
	/**
	`onAbort` is invoked if the Op is not chosen by the `choose()`

	```typescript
	await select(
		always(1),
		never().wrapAbort(() => console.log("aborted"))),
	)
	```
	*/
	wrapAbort(onAbort: () => void): Op<T> {
		return new WrapAbort(this, onAbort)
	}
	/**
	`fn` is used for transforming the result from type T to type R.

	```typescript
	await always(2).wrap(n => x * 2).sync() // 4
	```
	*/
	abstract wrap<R>(fn: (v: T) => R): Op<R>
	protected abstract flatten(
		abortList: number[],
		genOps: GenOp<T>[],
		abortMap: AbortMap,
	): { genOps: GenOp<T>[]; abortMap: AbortMap }
}

/**
used for creating new Op
*/
export class Operation<T> extends Op<T> {
	private builder: OpBuilder<T>
	constructor(builder: OpBuilder<T>) {
		super()
		this.builder = builder
	}
	wrap<R>(fn: (v: T) => R): Op<R> {
		return new Operation((performed, idx) => {
			const inner = this.builder(performed, idx)
			return {
				poll: () => inner.poll(),
				suspend: () => inner.suspend(),
				result: () => fn(inner.result()),
			}
		})
	}
	protected flatten(
		shouldNotAbort: number[],
		genOps: GenOp<T>[],
		abortMap: AbortMap,
	): { genOps: GenOp<T>[]; abortMap: AbortMap } {
		genOps.push({ builder: this.builder, shouldNotAbort })
		return { genOps, abortMap }
	}
}

class Choose<T> extends Op<T> {
	private ops: Op<T>[]
	constructor(ops: Op<T>[]) {
		super()
		this.ops = ops
	}
	wrap<R>(fn: (v: T) => R): Op<R> {
		return new Choose(this.ops.map((e) => e.wrap(fn)))
	}
	protected flatten(
		shouldNotAbort: number[],
		genOps: GenOp<T>[],
		abortMap: AbortMap,
	): { genOps: GenOp<T>[]; abortMap: AbortMap } {
		return this.ops.reduce(
			({ genOps, abortMap }, curr: Op<T>) => {
				// @ts-expect-error
				return curr.flatten(shouldNotAbort, genOps, abortMap)
			},
			{ genOps, abortMap },
		)
	}
}

class WrapAbort<T> extends Op<T> {
	private op: Op<T>
	private onAbort: () => void
	constructor(op: Op<T>, onAbort: () => void) {
		super()
		this.op = op
		this.onAbort = onAbort
	}
	wrap<R>(fn: (v: T) => R): Op<R> {
		return new WrapAbort(this.op.wrap(fn), this.onAbort)
	}
	protected flatten(
		shouldNotAbort: number[],
		genOps: GenOp<T>[],
		abortMap: AbortMap,
	): { genOps: GenOp<T>[]; abortMap: AbortMap } {
		const id = genSym()
		abortMap.set(id, this.onAbort)
		const shouldNotAbort2 = [...shouldNotAbort, id]
		// @ts-expect-error
		return this.op.flatten(shouldNotAbort2, genOps, abortMap)
	}
}

class Guard<T> extends Op<T> {
	private g: () => Op<T>
	constructor(g: () => Op<T>) {
		super()
		this.g = g
	}
	wrap<R>(fn: (v: T) => R): Op<R> {
		return new Guard(() => this.g().wrap(fn))
	}
	protected flatten(
		shouldNotAbort: number[],
		genOps: GenOp<T>[],
		abortMap: AbortMap,
	): { genOps: GenOp<T>[]; abortMap: AbortMap } {
		const op = this.g()
		// @ts-expect-error
		return op.flatten(shouldNotAbort, genOps, abortMap)
	}
}

///

async function basicSync<T>(
	abortMap: AbortMap,
	genOps: GenOp<T>[],
): Promise<T> {
	const performed = new Deferred<number>()
	const ops = genOps.map(({ builder }, idx) => {
		return builder(performed, idx)
	})

	// poll ops
	let idx: number | false = false
	for (let i = 0; i < ops.length; i++) {
		const op = ops[i]!
		if (op.poll()) {
			idx = i
			break
		}
	}

	// suspend ops
	if (idx === false) {
		ops.forEach((x) => x.suspend())
		idx = await performed.promise
	}

	const result = ops[idx]!.result()
	doAborts(abortMap, genOps[idx]!.shouldNotAbort)
	return result
}

function basicPoll<T>(abortMap: AbortMap, genOps: GenOp<T>[]): Option<T> {
	const performed = new Deferred<number>()
	const ops = genOps.map(({ builder }, idx) => {
		return builder(performed, idx)
	})

	// poll ops
	let idx: number | false = false
	for (let i = 0; i < ops.length; i++) {
		const op = ops[i]!
		if (op.poll()) {
			idx = i
			break
		}
	}

	if (idx !== false) {
		const result = ops[idx]!.result()
		doAborts(abortMap, genOps[idx]!.shouldNotAbort)
		return some(result)
	} else {
		doAborts(abortMap, [])
		return none
	}
}

function doAborts(abortMap: AbortMap, shouldNotAbort: number[]) {
	for (const [id, onAbort] of abortMap.entries()) {
		if (!shouldNotAbort.includes(id)) {
			onAbort()
		}
	}
}

///

/**
just `choose(...ops).sync()`
*/
export function select<T>(...ops: Op<T>[]): Promise<T> {
	return new Choose(ops).sync()
}

/**
constructs the Op that represents the non-deterministic choice of the `ops`
*/
export function choose<T>(...ops: Op<T>[]): Op<T> {
	return new Choose(ops)
}

/**
use `fn` to create a new Op when it's polled
*/
export function guard<T>(fn: () => Op<T>): Op<T> {
	return new Guard(fn)
}
