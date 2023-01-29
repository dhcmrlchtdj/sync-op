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

- [isClosed](readableChannel.md#isclosed)
- [isDrained](readableChannel.md#isdrained)
- [receive](readableChannel.md#receive)

## Methods

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L7)

___

### isDrained

▸ **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L8)

___

### receive

▸ **receive**(): [`Op`](../classes/Op.md)<`Option`<`T`\>\>

#### Returns

[`Op`](../classes/Op.md)<`Option`<`T`\>\>

#### Defined in

[channel.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/517f729/src/channel.ts#L9)
