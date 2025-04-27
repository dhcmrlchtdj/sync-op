[**sync-op**](../README.md)

***

[sync-op](../README.md) / Channel

# Class: Channel\<T\>

Defined in: [channel.ts:23](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L23)

the synchronous channel

## Type Parameters

### T

`T`

## Implements

- [`readableChannel`](../interfaces/readableChannel.md)\<`T`\>
- [`writableChannel`](../interfaces/writableChannel.md)\<`T`\>

## Constructors

### Constructor

> **new Channel**\<`T`\>(`capacity`): `Channel`\<`T`\>

Defined in: [channel.ts:38](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L38)

create a new channel with buffer size `capacity`

```typescript
const unbuffered = new Channel()
const buffered = new Channel(1)
```

#### Parameters

##### capacity

`number` = `0`

#### Returns

`Channel`\<`T`\>

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncGenerator`\<`Awaited`\<`T`\>, `void`, `unknown`\>

Defined in: [channel.ts:182](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L182)

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

[`readableChannel`](../interfaces/readableChannel.md).[`[asyncIterator]`](../interfaces/readableChannel.md#asynciterator)

***

### close()

> **close**(): `void`

Defined in: [channel.ts:52](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L52)

#### Returns

`void`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`close`](../interfaces/writableChannel.md#close)

***

### isClosed()

> **isClosed**(): `boolean`

Defined in: [channel.ts:64](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L64)

#### Returns

`boolean`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`isClosed`](../interfaces/writableChannel.md#isclosed)

***

### isDrained()

> **isDrained**(): `boolean`

Defined in: [channel.ts:71](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L71)

returns `true` if the buffer is empty and there are no pending senders.

#### Returns

`boolean`

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`isDrained`](../interfaces/writableChannel.md#isdrained)

***

### receive()

> **receive**(): [`Op`](Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [channel.ts:132](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L132)

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

***

### send()

> **send**(`data`): [`Op`](Op.md)\<`boolean`\>

Defined in: [channel.ts:88](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L88)

sends the `data` message to the channel.
if channel is closed, return `false`.

```typescript
const op = ch.send("hello world")
await op.sync()
```

#### Parameters

##### data

`T`

#### Returns

[`Op`](Op.md)\<`boolean`\>

#### Implementation of

[`writableChannel`](../interfaces/writableChannel.md).[`send`](../interfaces/writableChannel.md#send)
