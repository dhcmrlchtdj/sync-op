[sync-op](../README.md) / writableChannel

# Interface: writableChannel<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`Channel`](../classes/Channel.md)

## Table of contents

### Methods

- [close](writableChannel.md#close)
- [isClosed](writableChannel.md#isclosed)
- [isDrained](writableChannel.md#isdrained)
- [send](writableChannel.md#send)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[channel.ts:17](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/channel.ts#L17)

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:14](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/channel.ts#L14)

___

### isDrained

▸ **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:15](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/channel.ts#L15)

___

### send

▸ **send**(`data`): [`Op`](../classes/Op.md)<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

[`Op`](../classes/Op.md)<`boolean`\>

#### Defined in

[channel.ts:16](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/channel.ts#L16)
