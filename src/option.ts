export type Option<T> = None | Some<T>

class None {
	isSome<T>(): this is Some<T> {
		return false
	}
	isNone(): this is None {
		return true
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
	isSome(): this is Some<T> {
		return true
	}
	isNone(): this is None {
		return false
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
