[sync-op](../README.md) / MVar

# Class: MVar<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](MVar.md#constructor)

### Methods

- [get](MVar.md#get)
- [put](MVar.md#put)
- [swap](MVar.md#swap)
- [take](MVar.md#take)

## Constructors

### constructor

• **new MVar**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[extension.ts:263](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L263)

## Methods

### get

▸ **get**(): [`Op`](Op.md)<`T`\>

read `MVar`

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:289](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L289)

___

### put

▸ **put**(`value`): `boolean`

fill `MVar` if it is empty
return `false` if it's not empty.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

#### Defined in

[extension.ts:272](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L272)

___

### swap

▸ **swap**(`newValue`): [`Op`](Op.md)<`T`\>

read `MVar` and replace it with `newValue`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:315](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L315)

___

### take

▸ **take**(): [`Op`](Op.md)<`T`\>

read `MVar` and clear it

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:308](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L308)
