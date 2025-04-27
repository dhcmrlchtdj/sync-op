[**sync-op**](../README.md)

***

[sync-op](../README.md) / Op

# Class: `abstract` Op\<T\>

Defined in: [operation.ts:41](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L41)

the first-class sychronous operations

## Extended by

- [`Operation`](Operation.md)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Op**\<`T`\>(): `Op`\<`T`\>

#### Returns

`Op`\<`T`\>

## Methods

### poll()

> **poll**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [operation.ts:53](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L53)

non-blocking version of `Op#sync`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### sync()

> **sync**(): `Promise`\<`T`\>

Defined in: [operation.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L45)

synchronizes on `Op`

#### Returns

`Promise`\<`T`\>

***

### wrap()

> `abstract` **wrap**\<`R`\>(`fn`): `Op`\<`R`\>

Defined in: [operation.ts:79](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L79)

`fn` is used to transform the result from type `T` to type `R`.

```typescript
await always(2).wrap(n => n * 2).sync() // 4
```

#### Type Parameters

##### R

`R`

#### Parameters

##### fn

(`v`) => `R`

#### Returns

`Op`\<`R`\>

***

### wrapAbort()

> **wrapAbort**(`onAbort`): `Op`\<`T`\>

Defined in: [operation.ts:68](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L68)

`onAbort` is called if `Op` is not chosen by the `choose()`

```typescript
choose(
	always(1),
	never().wrapAbort(() => console.log("aborted")),
).poll()
```

#### Parameters

##### onAbort

() => `void`

#### Returns

`Op`\<`T`\>
