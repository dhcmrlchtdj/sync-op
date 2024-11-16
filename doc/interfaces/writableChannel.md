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

[channel.ts:17](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L17)

***

### isClosed()

> **isClosed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:14](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L14)

***

### isDrained()

> **isDrained**(): `boolean`

#### Returns

`boolean`

#### Defined in

[channel.ts:15](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L15)

***

### send()

> **send**(`data`): [`Op`](../classes/Op.md)\<`boolean`\>

#### Parameters

• **data**: `T`

#### Returns

[`Op`](../classes/Op.md)\<`boolean`\>

#### Defined in

[channel.ts:16](https://github.com/dhcmrlchtdj/sync-op/blob/133adb7618f2d99175e28d5c119b7eff7ad21410/src/channel.ts#L16)
