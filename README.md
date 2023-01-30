# sync-op

first-class synchronous operations

## Install

```sh
$ npm install sync-op
```

## Usage

See [doc](https://github.com/dhcmrlchtdj/sync-op/tree/main/doc) for the full API.

### `Channel`

```typescript
const ch = new Channel<string>() // unbuffered channel

// send/receive create a new Op which is ready to be synced or polled
ch.send("hello").sync() // Promise<boolean>
const r = ch.receive().poll() // Some(Some("hello"))

///

const ch = new Channel<number>(1) // buffered channel

ch.send(1).poll() // Some(true), the data is buffered
ch.send(2).poll() // None, the buf is full and there is no receiver.
const s3 = ch.send(3).sync() // Promise<boolean>

ch.receive().poll() // Some(1), read from buffer. s3 is resolved and the data is pushed to buf.
ch.receive().poll() // Some(3), read from buffer
ch.receive().poll() // None, the buf is empty and there is no sender.

///

const ch = new Channel<number>(1)

ch.send(1).sync()
ch.send(2).sync()
ch.send(3).sync()
ch.close()

for await (const msg of ch) {
	console.log(msg) // 1, 2, 3
}
```

### `choose` / `select`

```typescript
const c1 = new Channel<string>()
const c2 = new Channel<number>()
const c3 = new Channel<boolean>()

c1.send("hello").sync()
c2.send(1).sync()
c3.receive().sync()

const op = choose<Option<string | number>>(c1.receive(), c2.receive())
const r = await op.sync() // maybe "hello" or 1

// `select(...ops)` is just a sugar for `choose(...ops).sync()`
await select(c1.receive(), c2.receive())

// `choose` can be nested
await choose<unknown>(op, c3.send(true)).sync()
```

### `always` / `never` / `wrap` / `fromTimeout` / `fromAbortSignal`

```typescript
const ch = new Channel<number>()

// use `always` to unblock the poll
choose(ch.receive(), always(1), never()).poll()

// `wrap` can be used for transform the result
await always(2)
	.wrap((x) => x * 2)
	.sync() // 4

// set a timeout for `Op#sync()`
// the timer is started when it is polled/synced.
choose(ch.receive(), fromTimeout(10)).sync()

// use AbortController to abort an Op.
const ac = new AbortController()
setTimeout(() => ac.abort(), 10)
choose(ch.receive(), fromAbortSignal(ac.signal)).sync()
```

### `fromPromise` / `guard`

```typescript
await fromPromise(Promise.resolve(1)).sync() // 1

await fromPromise(Promise.reject("error")).sync() // throw "error"

const ac = new AbortController()
// `guard` will create a new Op when it is polled/synced
const fetchOp = guard(() =>
	fromPromise(fetch("http://127.0.0.1", { signal: ac.signal })),
).wrapAbort(() => ac.abort())
await choose(fromTimeout(10), fetchOp).sync()
```

## Resource

-   https://people.cs.uchicago.edu/~jhr/papers/cml.html
-   http://cml.cs.uchicago.edu/pages/cml.html
-   https://docs.racket-lang.org/reference/sync.html
-   https://ocaml.org/api/Event.html
-   https://wingolog.org/archives/2017/06/29/a-new-concurrent-ml

## License

This library is licensed under LGPL-2.1.
The core of this library is based on ocaml [event](https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml).
