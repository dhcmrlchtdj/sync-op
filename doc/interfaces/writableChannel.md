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

channel.ts:16

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

channel.ts:13

___

### isDrained

▸ **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

channel.ts:14

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

channel.ts:15
