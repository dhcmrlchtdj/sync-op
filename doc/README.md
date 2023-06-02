sync-op

# sync-op

## Table of contents

### Classes

- [Channel](classes/Channel.md)
- [Deferred](classes/Deferred.md)
- [IVar](classes/IVar.md)
- [MVar](classes/MVar.md)
- [Mutex](classes/Mutex.md)
- [Op](classes/Op.md)
- [Operation](classes/Operation.md)
- [Semaphore](classes/Semaphore.md)

### Interfaces

- [readableChannel](interfaces/readableChannel.md)
- [writableChannel](interfaces/writableChannel.md)

### Type Aliases

- [BasicOp](README.md#basicop)
- [OpBuilder](README.md#opbuilder)
- [Option](README.md#option)

### Variables

- [none](README.md#none)

### Functions

- [after](README.md#after)
- [always](README.md#always)
- [choose](README.md#choose)
- [fromAbortSignal](README.md#fromabortsignal)
- [fromPromise](README.md#frompromise)
- [guard](README.md#guard)
- [never](README.md#never)
- [select](README.md#select)
- [some](README.md#some)
- [timeout](README.md#timeout)

## Type Aliases

### BasicOp

Ƭ **BasicOp**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `poll` | () => `void` |
| `result` | () => `T` |
| `suspend` | () => `void` |

#### Defined in

[operation.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/operation.ts#L6)

___

### OpBuilder

Ƭ **OpBuilder**<`T`\>: (`performed`: [`Deferred`](classes/Deferred.md)<`number`\>, `idx`: `number`) => [`BasicOp`](README.md#basicop)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`performed`, `idx`): [`BasicOp`](README.md#basicop)<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `performed` | [`Deferred`](classes/Deferred.md)<`number`\> |
| `idx` | `number` |

##### Returns

[`BasicOp`](README.md#basicop)<`T`\>

#### Defined in

[operation.ts:12](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/operation.ts#L12)

___

### Option

Ƭ **Option**<`T`\>: `None` \| `Some`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[option.ts:1](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/option.ts#L1)

## Variables

### none

• `Const` **none**: `None`

#### Defined in

[option.ts:43](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/option.ts#L43)

## Functions

### after

▸ **after**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when `Op` is created

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[extension.ts:100](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L100)

___

### always

▸ **always**<`T`\>(`data`): [`Op`](classes/Op.md)<`T`\>

always ready for synchronization

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

[`Op`](classes/Op.md)<`T`\>

#### Defined in

[extension.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L10)

___

### choose

▸ **choose**<`T`\>(`...ops`): [`Op`](classes/Op.md)<`T`[`number`] extends [`Op`](classes/Op.md)<infer R\> ? `R` : `never`\>

create an `Op` that represents the non-deterministic choice of `...ops`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Op`](classes/Op.md)<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...ops` | `T` |

#### Returns

[`Op`](classes/Op.md)<`T`[`number`] extends [`Op`](classes/Op.md)<infer R\> ? `R` : `never`\>

#### Defined in

[operation.ts:263](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/operation.ts#L263)

___

### fromAbortSignal

▸ **fromAbortSignal**(`signal`): [`Op`](classes/Op.md)<`unknown`\>

convert `AbortSignal` to `Op`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |

#### Returns

[`Op`](classes/Op.md)<`unknown`\>

#### Defined in

[extension.ts:65](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L65)

___

### fromPromise

▸ **fromPromise**<`T`\>(`p`): [`Op`](classes/Op.md)<`Promise`<`T`\>\>

convert `Promise` to `Op`

> **Warning**
> if `Promise` is rejected, `await op.sync()` will throw the error.

```typescript
await fromPromise(Promise.reject("error").catch(err => err)).sync()
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`<`T`\> |

#### Returns

[`Op`](classes/Op.md)<`Promise`<`T`\>\>

#### Defined in

[extension.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L45)

___

### guard

▸ **guard**<`T`\>(`fn`): [`Op`](classes/Op.md)<`T`\>

use `fn` to create new `Op` when it's polled

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => [`Op`](classes/Op.md)<`T`\> |

#### Returns

[`Op`](classes/Op.md)<`T`\>

#### Defined in

[operation.ts:272](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/operation.ts#L272)

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

never ready for synchronization

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

[extension.ts:23](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L23)

___

### select

▸ **select**<`T`\>(`...ops`): `Promise`<`T`[`number`] extends [`Op`](classes/Op.md)<infer R\> ? `R` : `never`\>

just a shorthand for `choose(...ops).sync()`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Op`](classes/Op.md)<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...ops` | `T` |

#### Returns

`Promise`<`T`[`number`] extends [`Op`](classes/Op.md)<infer R\> ? `R` : `never`\>

#### Defined in

[operation.ts:252](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/operation.ts#L252)

___

### some

▸ **some**<`T`\>(`v`): `Some`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

`Some`<`T`\>

#### Defined in

[option.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/option.ts#L45)

___

### timeout

▸ **timeout**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when `Op` is polled

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[extension.ts:93](https://github.com/dhcmrlchtdj/sync-op/blob/0a6e09c/src/extension.ts#L93)
