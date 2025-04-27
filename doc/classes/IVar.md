[**sync-op**](../README.md)

***

[sync-op](../README.md) / IVar

# Class: IVar\<T\>

Defined in: [extension.ts:210](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L210)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new IVar**\<`T`\>(): `IVar`\<`T`\>

Defined in: [extension.ts:213](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L213)

#### Returns

`IVar`\<`T`\>

## Methods

### get()

> **get**(): [`Op`](Op.md)\<`T`\>

Defined in: [extension.ts:236](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L236)

read `IVar`

#### Returns

[`Op`](Op.md)\<`T`\>

***

### put()

> **put**(`value`): `boolean`

Defined in: [extension.ts:222](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L222)

fill `IVar` if it is empty.
return `false` if it's not empty.

#### Parameters

##### value

`T`

#### Returns

`boolean`
