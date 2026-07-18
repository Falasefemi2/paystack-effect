import { Schema } from "effect"
import { Currency } from "../common"

export const ProductCreate = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
  price: Schema.Number,
  currency: Currency,
  limited: Schema.optionalKey(Schema.Boolean),
  quantity: Schema.optionalKey(Schema.Number),
}).annotate({ identifier: "ProductCreate" })

export type ProductCreate = Schema.Schema.Type<typeof ProductCreate>

export function ProductCreateFromJSON(json: unknown): ProductCreate {
  return ProductCreateFromJSONTyped(json)
}

export function ProductCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ProductCreate {
  return Schema.decodeUnknownSync(ProductCreate)(json)
}

export function ProductCreateToJSON(value?: ProductCreate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(ProductCreate)(value)
}
