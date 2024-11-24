[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`\>(`p`): [`Op`](../classes/Op.md)\<`Promise`\<`T`\>\>

convert `Promise` to `Op`

> **Warning**
> if `Promise` is rejected, `await op.sync()` will throw the error.

```typescript
await fromPromise(Promise.reject("error").catch(err => err)).sync()
```

## Type Parameters

• **T**

## Parameters

• **p**: `Promise`\<`T`\>

## Returns

[`Op`](../classes/Op.md)\<`Promise`\<`T`\>\>

## Defined in

[extension.ts:42](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/extension.ts#L42)
