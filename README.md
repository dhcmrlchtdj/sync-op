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

## [API](https://github.com/dhcmrlchtdj/sync-op/tree/main/doc)

## License

This library is licensed under LGPL-2.1.
The core of this library is based on ocaml [event](https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml).
