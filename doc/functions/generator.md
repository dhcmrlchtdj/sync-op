[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / generator

# Function: generator()

> **generator**\<`In`, `Out`, `Return`\>(`fn`): `object`

## Type Parameters

• **In** = `unknown`

• **Out** = `void`

• **Return** = `void`

## Parameters

• **fn**

## Returns

`object`

### \[asyncIterator\]()

> **\[asyncIterator\]**: () => \{ next: (val: Out) =\> Promise\<Result\>; return: (ret: Return) =\> Promise\<Result\>; throw: (err?: unknown) =\> Promise\<Result\>; \[Symbol.asyncIterator\]: () =\> ...; \}

#### Returns

\{ next: (val: Out) =\> Promise\<Result\>; return: (ret: Return) =\> Promise\<Result\>; throw: (err?: unknown) =\> Promise\<Result\>; \[Symbol.asyncIterator\]: () =\> ...; \}

### next()

> **next**: (`val`) => `Promise`\<`Result`\> = `_next`

#### Parameters

• **val**: `Out`

#### Returns

`Promise`\<`Result`\>

### return()

> **return**: (`ret`) => `Promise`\<`Result`\> = `_return`

#### Parameters

• **ret**: `Return`

#### Returns

`Promise`\<`Result`\>

### throw()

> **throw**: (`err`?) => `Promise`\<`Result`\> = `_throw`

#### Parameters

• **err?**: `unknown`

#### Returns

`Promise`\<`Result`\>

## Defined in

[generator.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/generator.ts#L7)
