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

[extension.ts:213](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L213)

## Methods

### get

▸ **get**(): [`Op`](Op.md)<`T`\>

read `MVar`

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:239](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L239)

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

[extension.ts:222](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L222)

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

[extension.ts:265](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L265)

___

### take

▸ **take**(): [`Op`](Op.md)<`T`\>

read `MVar` and clear it

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[extension.ts:258](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L258)
