[**sync-op**](../README.md)

***

[sync-op](../README.md) / Deferred

# Class: Deferred\<T\>

Defined in: [deferred.ts:1](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L1)

## Type Parameters

### T

`T` = `void`

## Constructors

### Constructor

> **new Deferred**\<`T`\>(): `Deferred`\<`T`\>

Defined in: [deferred.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L9)

#### Returns

`Deferred`\<`T`\>

## Properties

### isFulfilled

> **isFulfilled**: `boolean`

Defined in: [deferred.ts:3](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L3)

***

### isRejected

> **isRejected**: `boolean`

Defined in: [deferred.ts:5](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L5)

***

### isResolved

> **isResolved**: `boolean`

Defined in: [deferred.ts:4](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L4)

***

### promise

> **promise**: `Promise`\<`T`\>

Defined in: [deferred.ts:2](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L2)

***

### reject()

> **reject**: (`err?`) => `void`

Defined in: [deferred.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L7)

#### Parameters

##### err?

`unknown`

#### Returns

`void`

***

### resolve()

> **resolve**: (`payload`) => `void`

Defined in: [deferred.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/deferred.ts#L6)

#### Parameters

##### payload

`T` | `PromiseLike`\<`T`\>

#### Returns

`void`
