[sync-op](../README.md) / Channel

# Class: Channel<T\>

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `capacity` | `number` | `0` |

#### Defined in

channel.ts:38

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[close](../interfaces/writableChannel.md#close)

#### Defined in

channel.ts:46

___

### isClosed

▸ **isClosed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isClosed](../interfaces/writableChannel.md#isclosed)

#### Defined in

channel.ts:57

___

### isDrained

▸ **isDrained**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[isDrained](../interfaces/writableChannel.md#isdrained)

#### Defined in

channel.ts:60

___

### receive

▸ **receive**(): [`Op`](Op.md)<`Option`<`T`\>\>

#### Returns

[`Op`](Op.md)<`Option`<`T`\>\>

#### Implementation of

[readableChannel](../interfaces/readableChannel.md).[receive](../interfaces/readableChannel.md#receive)

#### Defined in

channel.ts:104

___

### send

▸ **send**(`data`): [`Op`](Op.md)<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

[`Op`](Op.md)<`boolean`\>

#### Implementation of

[writableChannel](../interfaces/writableChannel.md).[send](../interfaces/writableChannel.md#send)

#### Defined in

channel.ts:65
