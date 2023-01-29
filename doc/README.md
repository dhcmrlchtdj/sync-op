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

## Functions

### always

▸ **always**<`T`\>(`data`): [`Op`](classes/Op.md)<`T`\>

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

ext.ts:3

___

### choose

▸ **choose**<`T`\>(`...ops`): [`Op`](classes/Op.md)<`T`\>

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

operation.ts:215

___

### fromAbortSignal

▸ **fromAbortSignal**(`signal`): [`Op`](classes/Op.md)<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |

#### Returns

[`Op`](classes/Op.md)<`unknown`\>

#### Defined in

ext.ts:49

___

### fromPromise

▸ **fromPromise**<`T`\>(`p`): [`Op`](classes/Op.md)<`Promise`<`T`\>\>

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

ext.ts:28

___

### fromTimeout

▸ **fromTimeout**(`delay`): [`Op`](classes/Op.md)<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`Op`](classes/Op.md)<`unknown`\>

#### Defined in

ext.ts:77

___

### guard

▸ **guard**<`T`\>(`fn`): [`Op`](classes/Op.md)<`T`\>

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

operation.ts:219

___

### never

▸ **never**(): [`Op`](classes/Op.md)<`never`\>

#### Returns

[`Op`](classes/Op.md)<`never`\>

#### Defined in

ext.ts:16

___

### select

▸ **select**<`T`\>(`...ops`): `Promise`<`T`\>

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

operation.ts:211

___

### toIterator

▸ **toIterator**<`T`\>(`c`): `AsyncGenerator`<`T`\>

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

channel.ts:156
