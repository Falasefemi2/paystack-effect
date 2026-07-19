import { Schema } from "effect"
import { Currency } from "../common.js"

export const ProductUpdate = Schema.Struct({
  name: Schema.optionalKey(Schema.String),
  description: Schema.optionalKey(Schema.String),
  price: Schema.optionalKey(Schema.Number),
  currency: Schema.optionalKey(Currency),
  limited: Schema.optionalKey(Schema.Boolean),
  quantity: Schema.optionalKey(Schema.Number),
}).annotate({ identifier: "ProductUpdate" })

export type ProductUpdate = Schema.Schema.Type<typeof ProductUpdate>

export function ProductUpdateFromJSON(json: unknown): ProductUpdate {
  return ProductUpdateFromJSONTyped(json)
}

export function ProductUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ProductUpdate {
  return Schema.decodeUnknownSync(ProductUpdate)(json)
}

export function ProductUpdateToJSON(value?: ProductUpdate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(ProductUpdate)(value)
}
