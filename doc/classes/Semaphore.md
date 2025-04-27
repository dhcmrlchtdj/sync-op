[**sync-op**](../README.md)

***

[sync-op](../README.md) / Semaphore

# Class: Semaphore

Defined in: [extension.ts:160](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L160)

## Constructors

### Constructor

> **new Semaphore**(`capacity`): `Semaphore`

Defined in: [extension.ts:164](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L164)

#### Parameters

##### capacity

`number` = `1`

#### Returns

`Semaphore`

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

Defined in: [extension.ts:172](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L172)

#### Returns

[`Op`](Op.md)\<`void`\>

***

### unlock()

> **unlock**(): `void`

Defined in: [extension.ts:188](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L188)

#### Returns

`void`

***

### withLock()

> **withLock**\<`T`\>(`f`): `Promise`\<`T`\>

Defined in: [extension.ts:200](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L200)

#### Type Parameters

##### T

`T`

#### Parameters

##### f

() => `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>
