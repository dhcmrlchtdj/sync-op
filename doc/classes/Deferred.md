[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Deferred

# Class: Deferred\<T\>

## Type Parameters

• **T** = `void`

## Constructors

### new Deferred()

> **new Deferred**\<`T`\>(): [`Deferred`](Deferred.md)\<`T`\>

#### Returns

[`Deferred`](Deferred.md)\<`T`\>

#### Defined in

[deferred.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L9)

## Properties

### isFulfilled

> **isFulfilled**: `boolean`

#### Defined in

[deferred.ts:3](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L3)

***

### isRejected

> **isRejected**: `boolean`

#### Defined in

[deferred.ts:5](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L5)

***

### isResolved

> **isResolved**: `boolean`

#### Defined in

[deferred.ts:4](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L4)

***

### promise

> **promise**: `Promise`\<`T`\>

#### Defined in

[deferred.ts:2](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L2)

***

### reject()

> **reject**: (`err`?) => `void`

#### Parameters

• **err?**: `unknown`

#### Returns

`void`

#### Defined in

[deferred.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L7)

***

### resolve()

> **resolve**: (`payload`) => `void`

#### Parameters

• **payload**: `T` \| `PromiseLike`\<`T`\>

#### Returns

`void`

#### Defined in

[deferred.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/deferred.ts#L6)
