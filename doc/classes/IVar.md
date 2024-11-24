[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / IVar

# Class: IVar\<T\>

## Type Parameters

• **T**

## Constructors

### new IVar()

> **new IVar**\<`T`\>(): [`IVar`](IVar.md)\<`T`\>

#### Returns

[`IVar`](IVar.md)\<`T`\>

#### Defined in

[extension.ts:213](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L213)

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

read `IVar`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:236](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L236)

***

### put()

> **put**(`value`): `boolean`

fill `IVar` if it is empty.
return `false` if it's not empty.

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[extension.ts:222](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L222)
