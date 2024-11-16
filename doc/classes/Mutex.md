[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Mutex

# Class: Mutex

## Constructors

### new Mutex()

> **new Mutex**(): [`Mutex`](Mutex.md)

#### Returns

[`Mutex`](Mutex.md)

#### Defined in

[extension.ts:119](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L119)

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

#### Returns

[`Op`](Op.md)\<`void`\>

#### Defined in

[extension.ts:123](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L123)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:139](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L139)

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

[extension.ts:151](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L151)
