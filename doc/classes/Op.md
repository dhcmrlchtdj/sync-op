[sync-op](../README.md) / Op

# Class: Op<T\>

the first-class sychronous operations

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

non-blocking version of `Op#sync`

#### Returns

`Option`<`T`\>

#### Defined in

[operation.ts:46](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L46)

___

### sync

▸ **sync**(): `Promise`<`T`\>

synchronizes on the Op

#### Returns

`Promise`<`T`\>

#### Defined in

[operation.ts:39](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L39)

___

### wrap

▸ `Abstract` **wrap**<`R`\>(`fn`): [`Op`](Op.md)<`R`\>

`fn` is used for transforming the result from type T to type R.

```typescript
await always(2).wrap(n => x * 2).sync() // 4
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

#### Defined in

[operation.ts:70](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L70)

___

### wrapAbort

▸ **wrapAbort**(`onAbort`): [`Op`](Op.md)<`T`\>

`onAbort` is invoked if the Op is not chosen by the `choose()`

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

#### Defined in

[operation.ts:60](https://github.com/dhcmrlchtdj/sync-op/blob/bd5f2f4/src/operation.ts#L60)
