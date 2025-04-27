[**sync-op**](../README.md)

***

[sync-op](../README.md) / generator

# Function: generator()

> **generator**\<`In`, `Out`, `Return`\>(`fn`): `object`

Defined in: [generator.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/generator.ts#L7)

## Type Parameters

### In

`In` = `unknown`

### Out

`Out` = `void`

### Return

`Return` = `void`

## Parameters

### fn

(`Yield`) => `Return` \| `Promise`\<`Return`\>

## Returns

`object`

### \[asyncIterator\]()

> **\[asyncIterator\]**: () => \{ next: (val: Out) =\> Promise\<Result\>; return: (ret: Return) =\> Promise\<Result\>; throw: (err?: unknown) =\> Promise\<Result\>; \[Symbol.asyncIterator\]: () =\> ...; \}

#### Returns

\{ next: (val: Out) =\> Promise\<Result\>; return: (ret: Return) =\> Promise\<Result\>; throw: (err?: unknown) =\> Promise\<Result\>; \[Symbol.asyncIterator\]: () =\> ...; \}

### next()

> **next**: (`val`) => `Promise`\<`Result`\> = `_next`

#### Parameters

##### val

`Out`

#### Returns

`Promise`\<`Result`\>

### return()

> **return**: (`ret`) => `Promise`\<`Result`\> = `_return`

#### Parameters

##### ret

`Return`

#### Returns

`Promise`\<`Result`\>

### throw()

> **throw**: (`err?`) => `Promise`\<`Result`\> = `_throw`

#### Parameters

##### err?

`unknown`

#### Returns

`Promise`\<`Result`\>
