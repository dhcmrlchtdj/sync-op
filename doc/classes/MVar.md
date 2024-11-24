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

[extension.ts:256](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L256)

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

read `MVar`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:282](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L282)

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

[extension.ts:265](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L265)

***

### swap()

> **swap**(`newValue`): [`Op`](Op.md)\<`T`\>

read `MVar` and replace it with `newValue`

#### Parameters

• **newValue**: `T`

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:308](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L308)

***

### take()

> **take**(): [`Op`](Op.md)\<`T`\>

read `MVar` and clear it

#### Returns

[`Op`](Op.md)\<`T`\>

#### Defined in

[extension.ts:301](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L301)
