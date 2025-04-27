[**sync-op**](../README.md)

***

[sync-op](../README.md) / readableChannel

# Interface: readableChannel\<T\>

Defined in: [channel.ts:6](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L6)

## Type Parameters

### T

`T`

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncGenerator`\<`T`\>

Defined in: [channel.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L10)

#### Returns

`AsyncGenerator`\<`T`\>

***

### isClosed()

> **isClosed**(): `boolean`

Defined in: [channel.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L7)

#### Returns

`boolean`

***

### isDrained()

> **isDrained**(): `boolean`

Defined in: [channel.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L8)

#### Returns

`boolean`

***

### receive()

> **receive**(): [`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [channel.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L9)

#### Returns

[`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>
