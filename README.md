# sync-op

first-class synchronous operations

## Install

```sh
$ npm install sync-op
```

## Usage

```typescript
import { Channel, select, fromTimeout } from "sync-op"

const ch = new Channel()
ch.send("hello").sync()
const r1 = await ch.receive().sync() // Some("hello")
console.log(r1.isSome()) // true
console.log(r1.unwrap()) // "hello"

const r2 = await select(
	ch.receive().wrapAbort(() => console.log("aborted")),
	fromTimeout(10).wrap(() => "timeout"),
)
console.log(r2) // "timeout"

ch.send("world").sync()
const r3 = await select(
	ch.receive().wrap((x) => x.unwrap()),
	fromTimeout(10).wrap(() => "timeout"),
)
console.log(r3) // "world"
```

## API

### Op<T>

#### Op<T>#sync(): Promise<T>

#### Op<T>#poll(): Option<T>

#### Op<T>#wrap<R>(fn: (v: T) => R): Op<R>

#### Op<T>#wrapAbort(onAbort: () => void): Op<T>

### select<T>(...ops: Op<T>[]): Promise<T>

`select(...ops)` = `choose(...ops).sync()`

### choose<T>(...ops: Op<T>[]): Op<T>

### guard<T>(fn: () => Op<T>): Op<T>

### always<T>(data:T): Op<T>

### never(): Op<never>

### fromTimeout(delay: number): Op<unknown>

`fromTimeout(delay)` = `guard(() => fromAbortSignal(AbortSignal.timeout(delay)))`

### fromAbortSignal(signal: AbortSignal): Op<unknown>

### fromPromise<T>(p: Promise<T>): Op<Promise<T>>

### Channel<T>

#### Channel<T>#send(data: T): Op<boolean>

#### Channel<T>#receive(): Op<Option<T>>

#### Channel<T>#close(): void

#### Channel<T>#isClosed(): boolean

### Option<T>

#### Option<T>#isNone(): boolean

#### Option<T>#isSome(): boolean

#### Option<T>#unwrap(): T

#### Option<T>#map<K>(f: (x: T) => K): Option<K>

#### Option<T>#bind<K>(f: (x: T) => Option<K>): Option<K>

## License

This library is licensed under LGPL-2.1.
The core of this library is based on ocaml [event](https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml), which is licensed under LGPL-2.1.
