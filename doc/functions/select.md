[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / select

# Function: select()

> **select**\<`T`\>(...`ops`): `Promise`\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<infer R\> ? `R` : `never`\>

just a shorthand for `choose(...ops).sync()`

## Type Parameters

• **T** *extends* [`Op`](../classes/Op.md)\<`unknown`\>[]

## Parameters

• ...**ops**: `T`

## Returns

`Promise`\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<infer R\> ? `R` : `never`\>

## Defined in

[operation.ts:252](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L252)
