sync-op

# sync-op

## Table of contents

### Classes

- [Channel](classes/Channel.md)
- [Op](classes/Op.md)
- [Operation](classes/Operation.md)

### Interfaces

- [readableChannel](interfaces/readableChannel.md)
- [writableChannel](interfaces/writableChannel.md)

### Type Aliases

- [BasicOp](README.md#basicop)
- [OpBuilder](README.md#opbuilder)

### Functions

- [after](README.md#after)
- [always](README.md#always)
- [choose](README.md#choose)
- [fromAbortSignal](README.md#fromabortsignal)
- [fromPromise](README.md#frompromise)
- [guard](README.md#guard)
- [never](README.md#never)
- [select](README.md#select)
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
| `poll` | () => `boolean` |
| `result` | () => `T` |
| `suspend` | () => `void` |

#### Defined in

[operation.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L6)

___

### OpBuilder

Ƭ **OpBuilder**<`T`\>: (`performed`: `Deferred`<`number`\>, `idx`: `number`) => [`BasicOp`](README.md#basicop)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`performed`, `idx`): [`BasicOp`](README.md#basicop)<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `performed` | `Deferred`<`number`\> |
| `idx` | `number` |

##### Returns

[`BasicOp`](README.md#basicop)<`T`\>

#### Defined in

[operation.ts:12](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L12)

## Functions

### after

▸ **after**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when `Op` created

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[ext.ts:109](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L109)

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

[ext.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L8)

___

### choose

▸ **choose**<`T`\>(`...ops`): [`Op`](classes/Op.md)<`T`\>

constructs `Op` that represents the non-deterministic choice of the `ops`

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

[operation.ts:311](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L311)

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

[operation.ts:312](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L312)

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

[operation.ts:313](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L313)

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

[operation.ts:318](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L318)

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

[operation.ts:324](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L324)

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

[operation.ts:331](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L331)

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

[operation.ts:339](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L339)

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

[operation.ts:348](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L348)

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

[operation.ts:358](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L358)

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

[ext.ts:71](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L71)

___

### fromPromise

▸ **fromPromise**<`T`\>(`p`): [`Op`](classes/Op.md)<`Promise`<`T`\>\>

convert `Promise` to `Op`

> **Warning**
> if the `Promise` rejected, `await op.sync()` will throw the error.

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

[ext.ts:46](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L46)

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

[operation.ts:376](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L376)

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

never ready for synchronization

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

[ext.ts:24](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L24)

___

### select

▸ **select**<`T`\>(`...ops`): `Promise`<`T`\>

just `choose(...ops).sync()`

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

[operation.ts:246](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L246)

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

[operation.ts:247](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L247)

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

[operation.ts:248](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L248)

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

[operation.ts:253](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L253)

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

[operation.ts:259](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L259)

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

[operation.ts:266](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L266)

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

[operation.ts:274](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L274)

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

[operation.ts:283](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L283)

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

[operation.ts:293](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L293)

___

### timeout

▸ **timeout**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when `Op` polled

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[ext.ts:102](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/ext.ts#L102)
