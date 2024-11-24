[**sync-op**](../README.md) • **Docs**

***

[sync-op](../README.md) / readableChannel

# Interface: readableChannel\<T\>

## Type Parameters

• **T**

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncGenerator`\<`T`, `any`, `any`\>

#### Returns

`AsyncGenerator`\<`T`, `any`, `any`\>

#### Defined in

[channel.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L10)

***

### isClosed()

> **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L7)

***

### isDrained()

> **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L8)

***

### receive()

> **receive**(): [`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

#### Returns

[`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

#### Defined in

[channel.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/163328e6c4e45f4e1851de6e0cd2086a60714f03/src/channel.ts#L9)
