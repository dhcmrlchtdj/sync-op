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

[extension.ts:165](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L165)

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

#### Returns

[`Op`](Op.md)\<`void`\>

#### Defined in

[extension.ts:173](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L173)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:189](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L189)

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

[extension.ts:201](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L201)
