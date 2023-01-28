export type Option<T> = None | Some<T>

class None {
	isNone(): this is None {
		return true
	}
	isSome<T>(): this is Some<T> {
		return false
	}
	unwrap(): never {
		throw new Error("None.unwrap()")
	}
	map(): this {
		return this
	}
	bind(): this {
		return this
	}
}

class Some<T> {
	value: T
	constructor(value: T) {
		this.value = value
	}
	isNone(): this is None {
		return false
	}
	isSome(): this is Some<T> {
		return true
	}
	unwrap(): T {
		return this.value
	}
	map<K>(f: (x: T) => K): Option<K> {
		return new Some(f(this.value))
	}
	bind<K>(f: (x: T) => Option<K>): Option<K> {
		return f(this.value)
	}
}

export const none = new None()

export const some = <T>(v: T): Some<T> => new Some(v)
