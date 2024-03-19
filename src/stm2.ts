// based on http://rystsov.info/2012/09/01/cas.html

const Txn = Symbol()
const Ver = Symbol()
const Curr = Symbol()
const Next = Symbol()
export class Var<T> {
	[Txn]: Transaction | null;
	[Ver]: number;
	[Curr]: T;
	[Next]: T
	constructor(value: T) {
		this[Txn] = null
		this[Ver] = 0
		this[Curr] = value
		this[Next] = value
	}
}

class ConflictError extends Error {}
export class Transaction {
	private state: "pending" | "committed" | "aborted"
	private versionMap: Map<Var<unknown>, number>
	constructor() {
		this.state = "pending"
		this.versionMap = new Map()
	}
	private cleanup() {
		for (const v of this.versionMap.keys()) {
			const prevTxn = v[Txn]
			if (prevTxn !== null) {
				if (prevTxn.state === "committed") {
					v[Curr] = v[Next]
					v[Ver] += 1
				} else if (prevTxn.state === "aborted") {
					v[Next] = v[Curr]
				}
				v[Txn] = null
			}
		}
	}
	abort() {
		if (this.state === "committed") throw new ConflictError()
		if (this.state === "pending") {
			this.state = "aborted"
			this.cleanup()
		}
	}
	commit() {
		if (this.state === "aborted") throw new ConflictError()
		if (this.state === "pending") {
			this.state = "committed"
			this.cleanup()
		}
	}
	load<T>(v: Var<T>): T {
		if (this.state !== "pending") throw new ConflictError()
		const prevTxn = v[Txn]
		if (prevTxn === this) return v[Next]
		if (prevTxn !== null) {
			if (prevTxn.state === "pending") {
				prevTxn.state = "aborted"
			}
			if (prevTxn.state === "committed") {
				v[Curr] = v[Next]
				v[Ver] += 1
			} else if (prevTxn.state === "aborted") {
				v[Next] = v[Curr]
			}
		}
		v[Txn] = this
		this.versionMap.set(v, v[Ver])
		return v[Curr]
	}
	store<T>(v: Var<T>, value: T) {
		if (this.state !== "pending") throw new ConflictError()
		if (!this.versionMap.has(v)) this.load(v)
		if (v[Ver] !== this.versionMap.get(v)) {
			this.state = "aborted"
			throw new ConflictError()
		}
		v[Next] = value
	}
}

export async function atomically<T>(
	speculative: (txn: Transaction) => T | Promise<T>,
) {
	while (true) {
		const txn = new Transaction()
		try {
			return await speculative(txn)
		} catch (err) {
			if (!(err instanceof ConflictError)) {
				throw err
			}
		}
	}
}
