# sync-op

[![npm version](https://img.shields.io/npm/v/sync-op.svg)](https://www.npmjs.com/package/sync-op)

Concurrent ML style first-class synchronous operations for JavaScript.

## Installation

Install the package using npm:

```sh
$ npm install sync-op
```

Or explore and experiment directly in your browser with [StackBlitz](https://stackblitz.com/edit/sync-op?file=index.ts).

## Usage

Below is a quick example to get you started:

```typescript
import { Channel, choose } from "sync-op"

const c1 = new Channel<string>()
const c2 = new Channel<number>()
const c3 = new Channel<boolean>()

c1.send("hello").sync()
c2.send(1).sync()
c3.receive().sync()

const op = choose(c1.receive(), c2.receive()) // Op<Option<string> | Option<number>>
await op.sync().unwrap() // maybe "hello" or 1

// `choose` can be nested
await choose(op, c3.send(true)).sync() // Option<string> | Option<number> | boolean
```

Dive into the [documentation](https://github.com/dhcmrlchtdj/sync-op/tree/main/doc) for the full API reference.

## Resource

- https://people.cs.uchicago.edu/~jhr/papers/cml.html
- http://cml.cs.uchicago.edu/pages/cml.html
- https://docs.racket-lang.org/reference/sync.html
- https://ocaml.org/api/Event.html
- https://wingolog.org/archives/2017/06/29/a-new-concurrent-ml
- https://medium.com/@asolove/synchronizable-abstractions-for-understandable-concurrency-64ae57cd61d1
- https://github.com/python-trio/trio/issues/242

## License

This library is licensed under LGPL-2.1.

The core of this library is derived from OCaml [event](https://github.com/ocaml/ocaml/blob/5.0.0/otherlibs/systhreads/event.ml).
