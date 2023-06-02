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

[extension.ts:220](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L220)

## Methods

### get

▸ **get**(): [`Op`](Op.md)<`T`\>

read `IVar`

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:243](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L243)

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

[extension.ts:229](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L229)
