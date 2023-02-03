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

[operation.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L6)

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

[operation.ts:12](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L12)

___

### Option

Ƭ **Option**<`T`\>: `None` \| `Some`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[option.ts:1](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/option.ts#L1)

## Variables

### none

• `Const` **none**: `None`

#### Defined in

[option.ts:43](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/option.ts#L43)

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

[extension.ts:100](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L100)

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

[extension.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L10)

___

### choose

▸ **choose**<`T`\>(`...ops`): [`Op`](classes/Op.md)<`T`\>

create an `Op` that represents the non-deterministic choice of `...ops`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...ops` | [`Op`](classes/Op.md)<`T`\>[] |

#### Returns

[`Op`](classes/Op.md)<`T`\>

#### Defined in

[operation.ts:317](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L317)

▸ **choose**<`T1`, `T2`\>(`op1`, `op2`): [`Op`](classes/Op.md)<`T1` \| `T2`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2`\>

#### Defined in

[operation.ts:318](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L318)

▸ **choose**<`T1`, `T2`, `T3`\>(`op1`, `op2`, `op3`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3`\>

#### Defined in

[operation.ts:319](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L319)

▸ **choose**<`T1`, `T2`, `T3`, `T4`\>(`op1`, `op2`, `op3`, `op4`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4`\>

#### Defined in

[operation.ts:324](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L324)

▸ **choose**<`T1`, `T2`, `T3`, `T4`, `T5`\>(`op1`, `op2`, `op3`, `op4`, `op5`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5`\>

#### Defined in

[operation.ts:330](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L330)

▸ **choose**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6`\>

#### Defined in

[operation.ts:337](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L337)

▸ **choose**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7`\>

#### Defined in

[operation.ts:345](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L345)

▸ **choose**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |
| `op8` | [`Op`](classes/Op.md)<`T8`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8`\>

#### Defined in

[operation.ts:354](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L354)

▸ **choose**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`): [`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8` \| `T9`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |
| `T9` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |
| `op8` | [`Op`](classes/Op.md)<`T8`\> |
| `op9` | [`Op`](classes/Op.md)<`T9`\> |

#### Returns

[`Op`](classes/Op.md)<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8` \| `T9`\>

#### Defined in

[operation.ts:364](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L364)

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

[extension.ts:65](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L65)

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

[extension.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L45)

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

[operation.ts:382](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L382)

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

never ready for synchronization

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

[extension.ts:23](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L23)

___

### select

▸ **select**<`T`\>(`...ops`): `Promise`<`T`\>

just a shorthand for `choose(...ops).sync()`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...ops` | [`Op`](classes/Op.md)<`T`\>[] |

#### Returns

`Promise`<`T`\>

#### Defined in

[operation.ts:252](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L252)

▸ **select**<`T1`, `T2`\>(`op1`, `op2`): `Promise`<`T1` \| `T2`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |

#### Returns

`Promise`<`T1` \| `T2`\>

#### Defined in

[operation.ts:253](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L253)

▸ **select**<`T1`, `T2`, `T3`\>(`op1`, `op2`, `op3`): `Promise`<`T1` \| `T2` \| `T3`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3`\>

#### Defined in

[operation.ts:254](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L254)

▸ **select**<`T1`, `T2`, `T3`, `T4`\>(`op1`, `op2`, `op3`, `op4`): `Promise`<`T1` \| `T2` \| `T3` \| `T4`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4`\>

#### Defined in

[operation.ts:259](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L259)

▸ **select**<`T1`, `T2`, `T3`, `T4`, `T5`\>(`op1`, `op2`, `op3`, `op4`, `op5`): `Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5`\>

#### Defined in

[operation.ts:265](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L265)

▸ **select**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`): `Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6`\>

#### Defined in

[operation.ts:272](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L272)

▸ **select**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`): `Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7`\>

#### Defined in

[operation.ts:280](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L280)

▸ **select**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`): `Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |
| `op8` | [`Op`](classes/Op.md)<`T8`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8`\>

#### Defined in

[operation.ts:289](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L289)

▸ **select**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`): `Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8` \| `T9`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |
| `T9` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | [`Op`](classes/Op.md)<`T1`\> |
| `op2` | [`Op`](classes/Op.md)<`T2`\> |
| `op3` | [`Op`](classes/Op.md)<`T3`\> |
| `op4` | [`Op`](classes/Op.md)<`T4`\> |
| `op5` | [`Op`](classes/Op.md)<`T5`\> |
| `op6` | [`Op`](classes/Op.md)<`T6`\> |
| `op7` | [`Op`](classes/Op.md)<`T7`\> |
| `op8` | [`Op`](classes/Op.md)<`T8`\> |
| `op9` | [`Op`](classes/Op.md)<`T9`\> |

#### Returns

`Promise`<`T1` \| `T2` \| `T3` \| `T4` \| `T5` \| `T6` \| `T7` \| `T8` \| `T9`\>

#### Defined in

[operation.ts:299](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/operation.ts#L299)

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

[option.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/option.ts#L45)

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

[extension.ts:93](https://github.com/dhcmrlchtdj/sync-op/blob/165e48c/src/extension.ts#L93)
