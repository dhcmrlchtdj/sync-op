[sync-op](../README.md) / Channel

# Class: Channel<T\>

the synchronous channel

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`readableChannel`](../interfaces/readableChannel.md)<`T`\>
- [`writableChannel`](../interfaces/writableChannel.md)<`T`\>

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Methods

- [[asyncIterator]](Channel.md#[asynciterator])
- [close](Channel.md#close)
- [isClosed](Channel.md#isclosed)
- [isDrained](Channel.md#isdrained)
- [receive](Channel.md#receive)
- [send](Channel.md#send)

## Constructors

### constructor

• **new Channel**<`T`\>(`capacity?`)

create a new channel with buffer size `capacity`

```typescript
const unbuffered = new Channel()
const buffered = new Channel(1)
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `capacity` | `number` | `0` |

#### Defined in

[channel.ts:38](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L38)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

```typescript
const ch = new Channel()
ch.send(1)
ch.close()
for await (const msg of ch) {
	console.log(msg)
}
```

#### Returns

`AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

#### Implementation of

[readableChannel](../interfaces/readableChannel.md).[[asyncIterator]](../interfaces/readableChannel.md#[asynciterator])

#### Defined in

[channel.ts:186](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L186)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[close](../interfaces/writableChannel.md#close)

#### Defined in

[channel.ts:46](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L46)

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isClosed](../interfaces/writableChannel.md#isclosed)

#### Defined in

[channel.ts:55](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L55)

___

### isDrained

▸ **isDrained**(): `boolean`

return `true` if the buffer is empty and there is no pending senders.

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isDrained](../interfaces/writableChannel.md#isdrained)

#### Defined in

[channel.ts:62](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L62)

___

### receive

▸ **receive**(): [`Op`](Op.md)<`Option`<`T`\>\>

receives a message from the channel.
if the channel is drained, return `none`.

```typescript
const op = ch.receive()
const msg = await op.sync()
```

#### Returns

[`Op`](Op.md)<`Option`<`T`\>\>

#### Implementation of

[readableChannel](../interfaces/readableChannel.md).[receive](../interfaces/readableChannel.md#receive)

#### Defined in

[channel.ts:125](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L125)

___

### send

▸ **send**(`data`): [`Op`](Op.md)<`boolean`\>

sends the message `data` to the channel.
if the channel is closed, return `false`.

```typescript
const op = ch.send("hello world")
await op.sync()
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

[`Op`](Op.md)<`boolean`\>

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[send](../interfaces/writableChannel.md#send)

#### Defined in

[channel.ts:76](https://github.com/dhcmrlchtdj/sync-op/blob/d2b85da/src/channel.ts#L76)
