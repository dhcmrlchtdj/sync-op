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

[generator.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/generator.ts#L7)
