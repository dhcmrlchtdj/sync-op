[sync-op](../README.md) / Op

# Class: Op<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`Op`**

  ↳ [`Operation`](Operation.md)

## Table of contents

### Constructors

- [constructor](Op.md#constructor)

### Methods

- [poll](Op.md#poll)
- [sync](Op.md#sync)
- [wrap](Op.md#wrap)
- [wrapAbort](Op.md#wrapabort)

## Constructors

### constructor

• **new Op**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Methods

### poll

▸ **poll**(): `Option`<`T`\>

#### Returns

`Option`<`T`\>

#### Defined in

operation.ts:34

___

### sync

▸ **sync**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

operation.ts:30

___

### wrap

▸ `Abstract` **wrap**<`R`\>(`fn`): [`Op`](Op.md)<`R`\>

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

#### Defined in

operation.ts:41

___

### wrapAbort

▸ **wrapAbort**(`onAbort`): [`Op`](Op.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onAbort` | () => `void` |

#### Returns

[`Op`](Op.md)<`T`\>

#### Defined in

operation.ts:38
