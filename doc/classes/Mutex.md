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

[extension.ts:118](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L118)

## Methods

### lock()

> **lock**(): [`Op`](Op.md)\<`void`\>

#### Returns

[`Op`](Op.md)\<`void`\>

#### Defined in

[extension.ts:122](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L122)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Defined in

[extension.ts:138](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L138)

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

[extension.ts:150](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L150)
