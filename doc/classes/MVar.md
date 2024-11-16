[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / MVar

# Class: MVar\<T\>

## Type Parameters

• **T**

## Constructors

### new MVar()

> **new MVar**\<`T`\>(): [`MVar`](MVar.md)\<`T`\>

#### Returns

[`MVar`](MVar.md)\<`T`\>

#### Defined in

[extension.ts:257](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L257)

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

read `MVar`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:283](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L283)

***

### put()

> **put**(`value`): `boolean`

fill `MVar` if it is empty
return `false` if it's not empty.

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[extension.ts:266](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L266)

***

### swap()

> **swap**(`newValue`): [`Op`](Op.md)\<`T`\>

read `MVar` and replace it with `newValue`

#### Parameters

• **newValue**: `T`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:309](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L309)

***

### take()

> **take**(): [`Op`](Op.md)\<`T`\>

read `MVar` and clear it

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:302](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L302)
