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

[extension.ts:125](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L125)

## Methods

### lock

▸ **lock**(): [`Op`](Op.md)<`void`\>

#### Returns

[`Op`](Op.md)<`void`\>

#### Defined in

[extension.ts:129](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L129)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:145](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L145)

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

[extension.ts:157](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/extension.ts#L157)
