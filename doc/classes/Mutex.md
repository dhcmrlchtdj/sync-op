[**sync-op**](../README.md)

***

[sync-op](../README.md) / Mutex

# Class: Mutex

Defined in: [extension.ts:115](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L115)

## Constructors

### Constructor

> **new Mutex**(): `Mutex`

Defined in: [extension.ts:118](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L118)

#### Returns

`Mutex`

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

Defined in: [extension.ts:122](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L122)

#### Returns

[`Op`](Op.md)\<`void`\>

***

### unlock()

> **unlock**(): `void`

Defined in: [extension.ts:138](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L138)

#### Returns

`void`

***

### withLock()

> **withLock**\<`T`\>(`f`): `Promise`\<`T`\>

Defined in: [extension.ts:150](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L150)

#### Type Parameters

##### T

`T`

#### Parameters

##### f

() => `T` \| `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>
