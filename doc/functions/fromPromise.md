[**sync-op**](../README.md)

***

[sync-op](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`\>(`p`): [`Op`](../classes/Op.md)\<`Promise`\<`T`\>\>

Defined in: [extension.ts:42](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/extension.ts#L42)

convert `Promise` to `Op`

> **Warning**
> if `Promise` is rejected, `await op.sync()` will throw the error.

```typescript
await fromPromise(Promise.reject("error").catch(err => err)).sync()
```

## Type Parameters

### T

`T`

## Parameters

### p

`Promise`\<`T`\>

## Returns

[`Op`](../classes/Op.md)\<`Promise`\<`T`\>\>
