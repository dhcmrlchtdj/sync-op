[**sync-op**](../README.md)

***

[sync-op](../README.md) / MVar

# Class: MVar\<T\>

Defined in: [extension.ts:253](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L253)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new MVar**\<`T`\>(): `MVar`\<`T`\>

Defined in: [extension.ts:256](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L256)

#### Returns

`MVar`\<`T`\>

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

Defined in: [extension.ts:282](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L282)

read `MVar`

#### Returns

[`Op`](Op.md)\<`T`\>

***

### put()

> **put**(`value`): `boolean`

Defined in: [extension.ts:265](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L265)

fill `MVar` if it is empty
return `false` if it's not empty.

#### Parameters

##### value

`T`

#### Returns

`boolean`

***

### swap()

> **swap**(`newValue`): [`Op`](Op.md)\<`T`\>

Defined in: [extension.ts:319](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L319)

read `MVar` and replace it with `newValue`

#### Parameters

##### newValue

`T`

#### Returns

[`Op`](Op.md)\<`T`\>

***

### take()

> **take**(): [`Op`](Op.md)\<`T`\>

Defined in: [extension.ts:312](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L312)

read `MVar` and clear it

#### Returns

[`Op`](Op.md)\<`T`\>
