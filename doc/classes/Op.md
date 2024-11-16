[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / Op

# Class: `abstract` Op\<T\>

the first-class sychronous operations

## Extended by

- [`Operation`](Operation.md)

## Type Parameters

• **T**

## Constructors

### new Op()

> **new Op**\<`T`\>(): [`Op`](Op.md)\<`T`\>

#### Returns

[`Op`](Op.md)\<`T`\>

## Methods

### poll()

> **poll**(): [`Option`](../type-aliases/Option.md)\<`T`\>

non-blocking version of `Op#sync`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Defined in

[operation.ts:53](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L53)

***

### sync()

> **sync**(): `Promise`\<`T`\>

synchronizes on `Op`

#### Returns

`Promise`\<`T`\>

#### Defined in

[operation.ts:45](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L45)

***

### wrap()

> `abstract` **wrap**\<`R`\>(`fn`): [`Op`](Op.md)\<`R`\>

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

#### Defined in

[operation.ts:79](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L79)

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

#### Defined in

[operation.ts:68](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L68)
