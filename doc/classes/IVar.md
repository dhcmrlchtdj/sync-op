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

[extension.ts:214](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L214)

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

read `IVar`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:237](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L237)

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

[extension.ts:223](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L223)
