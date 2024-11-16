[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Operation

# Class: Operation\<T\>

the first-class sychronous operations

## Extends

- [`Op`](Op.md)\<`T`\>

## Type Parameters

• **T**

## Constructors

### new Operation()

> **new Operation**\<`T`\>(`builder`): [`Operation`](Operation.md)\<`T`\>

#### Parameters

• **builder**: [`OpBuilder`](../type-aliases/OpBuilder.md)\<`T`\>

#### Returns

[`Operation`](Operation.md)\<`T`\>

#### Overrides

[`Op`](Op.md).[`constructor`](Op.md#constructors)

#### Defined in

[operation.ts:89](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L89)

## Methods

### poll()

> **poll**(): [`Option`](../type-aliases/Option.md)\<`T`\>

non-blocking version of `Op#sync`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Inherited from

[`Op`](Op.md).[`poll`](Op.md#poll)

#### Defined in

[operation.ts:53](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L53)

***

### sync()

> **sync**(): `Promise`\<`T`\>

synchronizes on `Op`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`Op`](Op.md).[`sync`](Op.md#sync)

#### Defined in

[operation.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L45)

***

### wrap()

> **wrap**\<`R`\>(`fn`): [`Op`](Op.md)\<`R`\>

`fn` is used to transform the result from type `T` to type `R`.

```typescript
await always(2).wrap(n => n * 2).sync() // 4
```

#### Type Parameters

• **R**

#### Parameters

• **fn**

#### Returns

[`Op`](Op.md)\<`R`\>

#### Overrides

[`Op`](Op.md).[`wrap`](Op.md#wrap)

#### Defined in

[operation.ts:93](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L93)

***

### wrapAbort()

> **wrapAbort**(`onAbort`): [`Op`](Op.md)\<`T`\>

`onAbort` is called if `Op` is not chosen by the `choose()`

```typescript
await select(
	always(1),
	never().wrapAbort(() => console.log("aborted"))),
)
```

#### Parameters

• **onAbort**

#### Returns

[`Op`](Op.md)\<`T`\>

#### Inherited from

[`Op`](Op.md).[`wrapAbort`](Op.md#wrapabort)

#### Defined in

[operation.ts:68](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L68)
