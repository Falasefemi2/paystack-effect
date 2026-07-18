import { Schema } from "effect"
import { Currency } from "../common"

export const RefundCreate = Schema.Struct({
  transaction: Schema.String,
  amount: Schema.optionalKey(Schema.Number),
  currency: Schema.optionalKey(Currency),
  customerNote: Schema.optionalKey(Schema.String),
  merchantNote: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      customerNote: "customer_note",
      merchantNote: "merchant_note",
    }),
  )
  .annotate({ identifier: "RefundCreate" })

export type RefundCreate = Schema.Schema.Type<typeof RefundCreate>

export function RefundCreateFromJSON(json: unknown): RefundCreate {
  return RefundCreateFromJSONTyped(json)
}

export function RefundCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): RefundCreate {
  return Schema.decodeUnknownSync(RefundCreate)(json)
}

export function RefundCreateToJSON(value?: RefundCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(RefundCreate)(value)
}
