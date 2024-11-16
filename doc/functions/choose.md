[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / choose

# Function: choose()

> **choose**\<`T`\>(...`ops`): [`Op`](../classes/Op.md)\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<infer R\> ? `R` : `never`\>

create an `Op` that represents the non-deterministic choice of `...ops`

## Type Parameters

• **T** *extends* [`Op`](../classes/Op.md)\<`unknown`\>[]

## Parameters

• ...**ops**: `T`

## Returns

[`Op`](../classes/Op.md)\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<infer R\> ? `R` : `never`\>

## Defined in

[operation.ts:263](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/operation.ts#L263)
