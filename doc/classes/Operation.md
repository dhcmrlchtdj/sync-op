[**sync-op**](../README.md)

***

[sync-op](../README.md) / Operation

# Class: Operation\<T\>

Defined in: [operation.ts:87](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L87)

the first-class sychronous operations

## Extends

- [`Op`](Op.md)\<`T`\>

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Operation**\<`T`\>(`builder`): `Operation`\<`T`\>

Defined in: [operation.ts:89](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L89)

#### Parameters

##### builder

[`OpBuilder`](../type-aliases/OpBuilder.md)\<`T`\>

#### Returns

`Operation`\<`T`\>

#### Overrides

[`Op`](Op.md).[`constructor`](Op.md#constructor)

## Methods

### poll()

> **poll**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [operation.ts:53](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L53)

non-blocking version of `Op#sync`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Inherited from

[`Op`](Op.md).[`poll`](Op.md#poll)

***

### sync()

> **sync**(): `Promise`\<`T`\>

Defined in: [operation.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L45)

synchronizes on `Op`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`Op`](Op.md).[`sync`](Op.md#sync)

***

### wrap()

> **wrap**\<`R`\>(`fn`): [`Op`](Op.md)\<`R`\>

Defined in: [operation.ts:93](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L93)

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

[`Op`](Op.md)\<`R`\>

#### Overrides

[`Op`](Op.md).[`wrap`](Op.md#wrap)

***

### wrapAbort()

> **wrapAbort**(`onAbort`): [`Op`](Op.md)\<`T`\>

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

[`Op`](Op.md)\<`T`\>

#### Inherited from

[`Op`](Op.md).[`wrapAbort`](Op.md#wrapabort)
