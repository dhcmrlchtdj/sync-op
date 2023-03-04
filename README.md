# sync-op

sync-op provides CML-like first-class synchronous operations.

There are `Channel`, `select`, and more. If you know golang, they are similar.

Just read the following example to see how to use them.

## Install

```sh
$ npm install sync-op
```

or try `import { Channel } from "https://esm.sh/sync-op"` on [esm.sh/playground](https://playground.esm.sh/).

## Usage

See [doc](https://github.com/dhcmrlchtdj/sync-op/tree/main/doc) for the full API.

### `Channel`

```typescript
import { Channel } from "sync-op"

const ch = new Channel<string>() // unbuffered channel

// send/receive create a new Op which is ready to be synced or polled
ch.send("hello").sync() // Promise<boolean>
const r = ch.receive().poll() // Some(Some("hello"))

///

const ch = new Channel<number>(1) // buffered channel

ch.send(1).poll() // Some(true), the data is buffered
ch.send(2).poll() // None, the buf is full and there is no receiver.
const s3 = ch.send(3).sync() // Promise<boolean>

ch.receive().poll() // Some(Some(1)), read from buffer. s3 is resolved and the data is pushed to buf.
ch.receive().poll() // Some(Some(3)), read from buffer
ch.receive().poll() // None, the buf is empty and there is no sender.

ch.close()
ch.receive().poll() // Some(None), channel is closed

///

const ch = new Channel<number>()

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
import { Channel, choose, select } from "sync-op"

const c1 = new Channel<string>()
const c2 = new Channel<number>()
const c3 = new Channel<boolean>()

c1.send("hello").sync()
c2.send(1).sync()
c3.receive().sync()

const op = choose(c1.receive(), c2.receive()) // Op<Option<string> | Option<number>>
const r = await op.sync() // maybe "hello" or 1

// `select(...ops)` is just a sugar for `choose(...ops).sync()`
await select(c1.receive(), c2.receive()) // Option<string> | Option<number>

// `choose` can be nested
await choose(op, c3.send(true)).sync() // Option<string> | Option<number> | boolean
```

### `always` / `never` / `wrap` / `timeout` / `fromAbortSignal`

```typescript
import {
	Channel,
	choose,
	always,
	never,
	timeout,
	fromAbortSignal,
} from "sync-op"

const ch = new Channel<number>()

// use `always` to provide default value
choose(ch.receive(), always(1), never()).poll()

// `wrap` can be used to transform the result
always(2)
	.wrap((x) => x * 2)
	.sync() // Promise<4>

// set a timeout for `Op#sync()`
// the timer is started when it is polled
choose(ch.receive(), timeout(10)).sync()

// use AbortController to abort an Op.
const ac = new AbortController()
setTimeout(() => ac.abort(), 10)
choose(ch.receive(), fromAbortSignal(ac.signal)).sync()
```

### `fromPromise` / `guard`

```typescript
import { choose, guard, after, fromPromise } from "sync-op"

await fromPromise(Promise.resolve(1)).sync() // 1

await fromPromise(Promise.reject("error")).sync() // throw "error"

const timeout = after(0)
const ac = new AbortController()
// `guard` will create a new Op when it is polled
const fetchOp = guard(() =>
	fromPromise(fetch("http://127.0.0.1", { signal: ac.signal })),
).wrapAbort(() => ac.abort())
await choose(timeout, fetchOp).sync()
```

## Resource

-   https://people.cs.uchicago.edu/~jhr/papers/cml.html
-   http://cml.cs.uchicago.edu/pages/cml.html
-   https://docs.racket-lang.org/reference/sync.html
-   https://ocaml.org/api/Event.html
-   https://wingolog.org/archives/2017/06/29/a-new-concurrent-ml
-   https://medium.com/@asolove/synchronizable-abstractions-for-understandable-concurrency-64ae57cd61d1
-   https://github.com/python-trio/trio/issues/242

## License

This library is licensed under LGPL-2.1.
The core of this library is based on ocaml [event](https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml).
