[**sync-op**](../README.md)

***

[sync-op](../README.md) / choose

# Function: choose()

> **choose**\<`T`\>(...`ops`): [`Op`](../classes/Op.md)\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<`R`\> ? `R` : `never`\>

Defined in: [operation.ts:252](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/operation.ts#L252)

create an `Op` that represents the non-deterministic choice of `...ops`

## Type Parameters

### T

`T` *extends* [`Op`](../classes/Op.md)\<`unknown`\>[]

## Parameters

### ops

...`T`

## Returns

[`Op`](../classes/Op.md)\<`T`\[`number`\] *extends* [`Op`](../classes/Op.md)\<`R`\> ? `R` : `never`\>
