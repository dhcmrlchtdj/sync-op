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

[ext.ts:204](https://github.com/dhcmrlchtdj/sync-op/blob/87263f3/src/ext.ts#L204)

## Methods

### get

▸ **get**(): [`Op`](Op.md)<`T`\>

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[ext.ts:225](https://github.com/dhcmrlchtdj/sync-op/blob/87263f3/src/ext.ts#L225)

___

### put

▸ **put**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

#### Defined in

[ext.ts:210](https://github.com/dhcmrlchtdj/sync-op/blob/87263f3/src/ext.ts#L210)

___

### swap

▸ **swap**(`newValue`): [`Op`](Op.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[ext.ts:272](https://github.com/dhcmrlchtdj/sync-op/blob/87263f3/src/ext.ts#L272)

___

### take

▸ **take**(): [`Op`](Op.md)<`T`\>

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

[ext.ts:242](https://github.com/dhcmrlchtdj/sync-op/blob/87263f3/src/ext.ts#L242)
