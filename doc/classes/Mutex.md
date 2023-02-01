[sync-op](../README.md) / Mutex

# Class: Mutex

## Table of contents

### Constructors

- [constructor](Mutex.md#constructor)

### Methods

- [lock](Mutex.md#lock)
- [unlock](Mutex.md#unlock)
- [withLock](Mutex.md#withlock)

## Constructors

### constructor

• **new Mutex**()

#### Defined in

[ext.ts:125](https://github.com/dhcmrlchtdj/sync-op/blob/5c2057c/src/ext.ts#L125)

## Methods

### lock

▸ **lock**(): [`Op`](Op.md)<`void`\>

#### Returns

[`Op`](Op.md)<`void`\>

#### Defined in

[ext.ts:129](https://github.com/dhcmrlchtdj/sync-op/blob/5c2057c/src/ext.ts#L129)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[ext.ts:145](https://github.com/dhcmrlchtdj/sync-op/blob/5c2057c/src/ext.ts#L145)

___

### withLock

▸ **withLock**<`T`\>(`f`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | () => `T` \| `Promise`<`T`\> |

#### Returns

`Promise`<`T`\>

#### Defined in

[ext.ts:157](https://github.com/dhcmrlchtdj/sync-op/blob/5c2057c/src/ext.ts#L157)
