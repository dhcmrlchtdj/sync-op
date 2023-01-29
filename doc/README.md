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

- [always](README.md#always)
- [choose](README.md#choose)
- [fromAbortSignal](README.md#fromabortsignal)
- [fromPromise](README.md#frompromise)
- [fromTimeout](README.md#fromtimeout)
- [guard](README.md#guard)
- [never](README.md#never)
- [select](README.md#select)
- [toIterator](README.md#toiterator)

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

operation.ts:6

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

operation.ts:12

## Functions

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

ext.ts:6

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

operation.ts:253

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

ext.ts:68

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

ext.ts:44

___

### fromTimeout

▸ **fromTimeout**(`delay`): [`Op`](classes/Op.md)<`unknown`\>

the timer is started when it's be polled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`unknown`\>

#### Defined in

ext.ts:99

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

operation.ts:260

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

an operation that is never ready for synchronization

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

ext.ts:22

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

operation.ts:246

___

### toIterator

▸ **toIterator**<`T`\>(`c`): `AsyncGenerator`<`T`\>

used to work with `for await...of`.

```typescript
const ch = new Channel()
for await (const msg of toIterator(ch)) {
	console.log(msg)
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`readableChannel`](interfaces/readableChannel.md)<`T`\> |

#### Returns

`AsyncGenerator`<`T`\>

#### Defined in

channel.ts:199
