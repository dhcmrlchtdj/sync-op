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

[operation.ts:252](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/operation.ts#L252)
