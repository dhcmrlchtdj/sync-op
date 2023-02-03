[sync-op](../README.md) / Deferred

# Class: Deferred<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `void` |

## Table of contents

### Constructors

- [constructor](Deferred.md#constructor)

### Properties

- [isFulfilled](Deferred.md#isfulfilled)
- [isRejected](Deferred.md#isrejected)
- [isResolved](Deferred.md#isresolved)
- [promise](Deferred.md#promise)
- [reject](Deferred.md#reject)
- [resolve](Deferred.md#resolve)

## Constructors

### constructor

• **new Deferred**<`T`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `void` |

#### Defined in

[deferred.ts:11](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L11)

## Properties

### isFulfilled

• **isFulfilled**: `boolean`

#### Defined in

[deferred.ts:3](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L3)

___

### isRejected

• **isRejected**: `boolean`

#### Defined in

[deferred.ts:5](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L5)

___

### isResolved

• **isResolved**: `boolean`

#### Defined in

[deferred.ts:4](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L4)

___

### promise

• **promise**: `Promise`<`T`\>

#### Defined in

[deferred.ts:2](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L2)

___

### reject

• **reject**: (`err?`: `unknown`) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `unknown` |

##### Returns

`void`

#### Defined in

[deferred.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L9)

___

### resolve

• **resolve**: (`payload`: `T` \| `PromiseLike`<`T`\>) => `void`

#### Type declaration

▸ (`payload`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `T` \| `PromiseLike`<`T`\> |

##### Returns

`void`

#### Defined in

[deferred.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/b976202/src/deferred.ts#L7)
