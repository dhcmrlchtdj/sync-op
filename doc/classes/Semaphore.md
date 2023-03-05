[sync-op](../README.md) / Semaphore

# Class: Semaphore

## Table of contents

### Constructors

- [constructor](Semaphore.md#constructor)

### Methods

- [lock](Semaphore.md#lock)
- [unlock](Semaphore.md#unlock)
- [withLock](Semaphore.md#withlock)

## Constructors

### constructor

• **new Semaphore**(`capacity?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `capacity` | `number` | `1` |

#### Defined in

[extension.ts:171](https://github.com/dhcmrlchtdj/sync-op/blob/de0d97f/src/extension.ts#L171)

## Methods

### lock

▸ **lock**(): [`Op`](Op.md)<`void`\>

#### Returns

[`Op`](Op.md)<`void`\>

#### Defined in

[extension.ts:179](https://github.com/dhcmrlchtdj/sync-op/blob/de0d97f/src/extension.ts#L179)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:195](https://github.com/dhcmrlchtdj/sync-op/blob/de0d97f/src/extension.ts#L195)

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
| `f` | () => `Promise`<`T`\> |

#### Returns

`Promise`<`T`\>

#### Defined in

[extension.ts:207](https://github.com/dhcmrlchtdj/sync-op/blob/de0d97f/src/extension.ts#L207)
