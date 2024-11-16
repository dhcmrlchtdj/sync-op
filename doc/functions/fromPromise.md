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

[extension.ts:42](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/extension.ts#L42)
