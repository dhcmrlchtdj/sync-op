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

[channel.ts:10](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L10)

***

### isClosed()

> **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:7](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L7)

***

### isDrained()

> **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:8](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L8)

***

### receive()

> **receive**(): [`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

#### Returns

[`Op`](../classes/Op.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

#### Defined in

[channel.ts:9](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L9)
