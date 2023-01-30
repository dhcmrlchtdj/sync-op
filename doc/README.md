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

[operation.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L6)

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

[operation.ts:12](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L12)

## Functions

### after

▸ **after**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when the Op is created

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[ext.ts:109](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L109)

___

### always

▸ **always**<`T`\>(`data`): [`Op`](classes/Op.md)<`T`\>

an operation that is always ready for synchronization

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

[ext.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L8)

___

### choose

▸ **choose**<`T`\>(`...ops`): [`Op`](classes/Op.md)<`T`\>

constructs the Op that represents the non-deterministic choice of the `ops`

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

[operation.ts:253](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L253)

___

### fromAbortSignal

▸ **fromAbortSignal**(`signal`): [`Op`](classes/Op.md)<`unknown`\>

convert AbortSignal to operation

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |

#### Returns

[`Op`](classes/Op.md)<`unknown`\>

#### Defined in

[ext.ts:71](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L71)

___

### fromPromise

▸ **fromPromise**<`T`\>(`p`): [`Op`](classes/Op.md)<`Promise`<`T`\>\>

convert promise to operation

> **Warning**
> if the promise rejected, `await op.sync()` will throw the error.

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

[ext.ts:46](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L46)

___

### guard

▸ **guard**<`T`\>(`fn`): [`Op`](classes/Op.md)<`T`\>

use `fn` to create a new Op when it's polled

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

[operation.ts:260](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L260)

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

an operation that is never ready for synchronization

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

[ext.ts:24](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L24)

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

[operation.ts:246](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L246)

___

### timeout

▸ **timeout**(`delay`): [`Op`](classes/Op.md)<`void`\>

the timer is started when the Op is polled

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`void`\>

#### Defined in

[ext.ts:102](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/ext.ts#L102)
