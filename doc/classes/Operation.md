[sync-op](../README.md) / Operation

# Class: Operation<T\>

the first-class sychronous operations

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
| `builder` | [`OpBuilder`](../README.md#opbuilder)<`T`\> |

#### Overrides

[Op](Op.md).[constructor](Op.md#constructor)

#### Defined in

[operation.ts:83](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L83)

## Methods

### poll

▸ **poll**(): `Option`<`T`\>

non-blocking version of `Op#sync`

#### Returns

`Option`<`T`\>

#### Inherited from

[Op](Op.md).[poll](Op.md#poll)

#### Defined in

[operation.ts:47](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L47)

___

### sync

▸ **sync**(): `Promise`<`T`\>

synchronizes on `Op`

#### Returns

`Promise`<`T`\>

#### Inherited from

[Op](Op.md).[sync](Op.md#sync)

#### Defined in

[operation.ts:39](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L39)

___

### wrap

▸ **wrap**<`R`\>(`fn`): [`Op`](Op.md)<`R`\>

`fn` is used to transform the result from type T to type R.

```typescript
await always(2).wrap(n => n * 2).sync() // 4
```

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

[operation.ts:87](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L87)

___

### wrapAbort

▸ **wrapAbort**(`onAbort`): [`Op`](Op.md)<`T`\>

`onAbort` is invoked if `Op` is not chosen by the `choose()`

```typescript
await select(
	always(1),
	never().wrapAbort(() => console.log("aborted"))),
)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `onAbort` | () => `void` |

#### Returns

[`Op`](Op.md)<`T`\>

#### Inherited from

[Op](Op.md).[wrapAbort](Op.md#wrapabort)

#### Defined in

[operation.ts:62](https://github.com/dhcmrlchtdj/sync-op/blob/6e55887/src/operation.ts#L62)
