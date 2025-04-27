[**sync-op**](../README.md)

***

[sync-op](../README.md) / writableChannel

# Interface: writableChannel\<T\>

Defined in: [channel.ts:13](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L13)

## Type Parameters

### T

`T`

## Methods

### close()

> **close**(): `void`

Defined in: [channel.ts:17](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L17)

#### Returns

`void`

***

### isClosed()

> **isClosed**(): `boolean`

Defined in: [channel.ts:14](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L14)

#### Returns

`boolean`

***

### isDrained()

> **isDrained**(): `boolean`

Defined in: [channel.ts:15](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L15)

#### Returns

`boolean`

***

### send()

> **send**(`data`): [`Op`](../classes/Op.md)\<`boolean`\>

Defined in: [channel.ts:16](https://github.com/dhcmrlchtdj/sync-op/blob/93fe32636f3c6c188a811dfea276951b3e31f9bc/src/channel.ts#L16)

#### Parameters

##### data

`T`

#### Returns

[`Op`](../classes/Op.md)\<`boolean`\>
