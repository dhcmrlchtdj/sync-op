[sync-op](../README.md) / IVar

# Class: IVar<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](IVar.md#constructor)

### Methods

- [get](IVar.md#get)
- [put](IVar.md#put)

## Constructors

### constructor

• **new IVar**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[extension.ts:170](https://github.com/dhcmrlchtdj/sync-op/blob/76a91db/src/extension.ts#L170)

## Methods

### get

▸ **get**(): [`Op`](Op.md)<`T`\>

read `IVar`

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:193](https://github.com/dhcmrlchtdj/sync-op/blob/76a91db/src/extension.ts#L193)

___

### put

▸ **put**(`value`): `boolean`

fill `IVar` if it is empty.
return `false` if it's not empty.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

#### Defined in

[extension.ts:179](https://github.com/dhcmrlchtdj/sync-op/blob/76a91db/src/extension.ts#L179)
