[sync-op](../README.md) / Operation

# Class: Operation<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Op`](Op.md)<`T`\>

  ↳ **`Operation`**

## Table of contents

### Constructors

- [constructor](Operation.md#constructor)

### Methods

- [flatten](Operation.md#flatten)
- [poll](Operation.md#poll)
- [sync](Operation.md#sync)
- [wrap](Operation.md#wrap)
- [wrapAbort](Operation.md#wrapabort)

## Constructors

### constructor

• **new Operation**<`T`\>(`builder`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | `OpBuilder`<`T`\> |

#### Overrides

[Op](Op.md).[constructor](Op.md#constructor)

#### Defined in

operation.ts:51

## Methods

### flatten

▸ **flatten**(`shouldNotAbort`, `genOps`, `abortMap`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shouldNotAbort` | `number`[] |
| `genOps` | `GenOp`<`T`\>[] |
| `abortMap` | `AbortMap` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `abortMap` | `AbortMap` |
| `genOps` | `GenOp`<`T`\>[] |

#### Overrides

Op.flatten

#### Defined in

operation.ts:65

___

### poll

▸ **poll**(): `Option`<`T`\>

#### Returns

`Option`<`T`\>

#### Inherited from

[Op](Op.md).[poll](Op.md#poll)

#### Defined in

operation.ts:34

___

### sync

▸ **sync**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Inherited from

[Op](Op.md).[sync](Op.md#sync)

#### Defined in

operation.ts:30

___

### wrap

▸ **wrap**<`R`\>(`fn`): [`Op`](Op.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`v`: `T`) => `R` |

#### Returns

[`Op`](Op.md)<`R`\>

#### Overrides

[Op](Op.md).[wrap](Op.md#wrap)

#### Defined in

operation.ts:55

___

### wrapAbort

▸ **wrapAbort**(`onAbort`): [`Op`](Op.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onAbort` | () => `void` |

#### Returns

[`Op`](Op.md)<`T`\>

#### Inherited from

[Op](Op.md).[wrapAbort](Op.md#wrapabort)

#### Defined in

operation.ts:38
