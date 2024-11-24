[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Channel

# Class: Channel\<T\>

the synchronous channel

## Type Parameters

• **T**

## Implements

- [`readableChannel`](../interfaces/readableChannel.md)\<`T`\>
- [`writableChannel`](../interfaces/writableChannel.md)\<`T`\>

## Constructors

### new Channel()

> **new Channel**\<`T`\>(`capacity`): [`Channel`](Channel.md)\<`T`\>

create a new channel with buffer size `capacity`

```typescript
const unbuffered = new Channel()
const buffered = new Channel(1)
```

#### Parameters

• **capacity**: `number` = `0`

#### Returns

[`Channel`](Channel.md)\<`T`\>

#### Defined in

[channel.ts:38](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L38)

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncGenerator`\<`Awaited`\<`T`\>, `void`, `unknown`\>

```typescript
const ch = new Channel()
ch.send(1)
ch.close()
for await (const msg of ch) {
	console.log(msg)
}
```

#### Returns

`AsyncGenerator`\<`Awaited`\<`T`\>, `void`, `unknown`\>

#### Implementation of

[`readableChannel`](../interfaces/readableChannel.md).[`[asyncIterator]`](../interfaces/readableChannel.md#%5Basynciterator%5D)

#### Defined in

[channel.ts:182](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L182)

***

### close()

> **close**(): `void`

#### Returns

`void`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`close`](../interfaces/writableChannel.md#close)

#### Defined in

[channel.ts:52](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L52)

***

### isClosed()

> **isClosed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`isClosed`](../interfaces/writableChannel.md#isclosed)

#### Defined in

[channel.ts:64](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L64)

***

### isDrained()

> **isDrained**(): `boolean`

returns `true` if the buffer is empty and there are no pending senders.

#### Returns

`boolean`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`isDrained`](../interfaces/writableChannel.md#isdrained)

#### Defined in

[channel.ts:71](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L71)

***

### receive()

> **receive**(): [`Op`](Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

receives a message from the channel.
if the channel is drained, return `none`.

```typescript
const op = ch.receive()
const msg = await op.sync()
```

#### Returns

[`Op`](Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

#### Implementation of

[`readableChannel`](../interfaces/readableChannel.md).[`receive`](../interfaces/readableChannel.md#receive)

#### Defined in

[channel.ts:132](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L132)

***

### send()

> **send**(`data`): [`Op`](Op.md)\<`boolean`\>

sends the `data` message to the channel.
if channel is closed, return `false`.

```typescript
const op = ch.send("hello world")
await op.sync()
```

#### Parameters

• **data**: `T`

#### Returns

[`Op`](Op.md)\<`boolean`\>

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`send`](../interfaces/writableChannel.md#send)

#### Defined in

[channel.ts:88](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L88)
