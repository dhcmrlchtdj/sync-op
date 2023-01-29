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

[channel.ts:37](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L37)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[close](../interfaces/writableChannel.md#close)

#### Defined in

[channel.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L45)

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isClosed](../interfaces/writableChannel.md#isclosed)

#### Defined in

[channel.ts:54](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L54)

___

### isDrained

▸ **isDrained**(): `boolean`

return `true` if the buffer is empty and there is no pending senders.

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isDrained](../interfaces/writableChannel.md#isdrained)

#### Defined in

[channel.ts:61](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L61)

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

[channel.ts:124](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L124)

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

[channel.ts:75](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L75)
