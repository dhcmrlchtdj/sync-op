[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / writableChannel

# Interface: writableChannel\<T\>

## Type Parameters

• **T**

## Methods

### close()

> **close**(): `void`

#### Returns

`void`

#### Defined in

[channel.ts:17](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L17)

***

### isClosed()

> **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:14](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L14)

***

### isDrained()

> **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:15](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L15)

***

### send()

> **send**(`data`): [`Op`](../classes/Op.md)\<`boolean`\>

#### Parameters

• **data**: `T`

#### Returns

[`Op`](../classes/Op.md)\<`boolean`\>

#### Defined in

[channel.ts:16](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L16)
