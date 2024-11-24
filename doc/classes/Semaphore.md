[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Semaphore

# Class: Semaphore

## Constructors

### new Semaphore()

> **new Semaphore**(`capacity`): [`Semaphore`](Semaphore.md)

#### Parameters

• **capacity**: `number` = `1`

#### Returns

[`Semaphore`](Semaphore.md)

#### Defined in

[extension.ts:164](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L164)

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

#### Returns

[`Op`](Op.md)\<`void`\>

#### Defined in

[extension.ts:172](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L172)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:188](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L188)

***

### withLock()

> **withLock**\<`T`\>(`f`): `Promise`\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **f**

#### Returns

`Promise`\<`T`\>

#### Defined in

[extension.ts:200](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L200)
