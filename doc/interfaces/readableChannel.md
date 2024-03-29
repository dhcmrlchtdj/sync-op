[sync-op](../README.md) / readableChannel

# Interface: readableChannel<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`Channel`](../classes/Channel.md)

## Table of contents

### Methods

- [[asyncIterator]](readableChannel.md#[asynciterator])
- [isClosed](readableChannel.md#isclosed)
- [isDrained](readableChannel.md#isdrained)
- [receive](readableChannel.md#receive)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncGenerator`<`T`, `any`, `unknown`\>

#### Returns

`AsyncGenerator`<`T`, `any`, `unknown`\>

#### Defined in

[channel.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L10)

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L7)

___

### isDrained

▸ **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L8)

___

### receive

▸ **receive**(): [`Op`](../classes/Op.md)<[`Option`](../README.md#option)<`T`\>\>

#### Returns

[`Op`](../classes/Op.md)<[`Option`](../README.md#option)<`T`\>\>

#### Defined in

[channel.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/channel.ts#L9)
