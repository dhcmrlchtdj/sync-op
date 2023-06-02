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

[channel.ts:38](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L38)

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

[channel.ts:182](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L182)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[close](../interfaces/writableChannel.md#close)

#### Defined in

[channel.ts:52](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L52)

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isClosed](../interfaces/writableChannel.md#isclosed)

#### Defined in

[channel.ts:64](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L64)

___

### isDrained

▸ **isDrained**(): `boolean`

returns `true` if the buffer is empty and there are no pending senders.

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isDrained](../interfaces/writableChannel.md#isdrained)

#### Defined in

[channel.ts:71](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L71)

___

### receive

▸ **receive**(): [`Op`](Op.md)<[`Option`](../README.md#option)<`T`\>\>

receives a message from the channel.
if the channel is drained, return `none`.

```typescript
const op = ch.receive()
const msg = await op.sync()
```

#### Returns

[`Op`](Op.md)<[`Option`](../README.md#option)<`T`\>\>

#### Implementation of

[readableChannel](../interfaces/readableChannel.md).[receive](../interfaces/readableChannel.md#receive)

#### Defined in

[channel.ts:132](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L132)

___

### send

▸ **send**(`data`): [`Op`](Op.md)<`boolean`\>

sends the `data` message to the channel.
if channel is closed, return `false`.

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

[channel.ts:88](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L88)
