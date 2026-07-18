import { Schema } from "effect"

export const TransferInitiate = Schema.Struct({
  source: Schema.String,
  amount: Schema.String,
  recipient: Schema.String,
  reason: Schema.optionalKey(Schema.String),
  currency: Schema.optionalKey(Schema.String),
  reference: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      source: "source",
      amount: "amount",
      recipient: "recipient",
      reason: "reason",
      currency: "currency",
      reference: "reference",
    }),
  )
  .annotate({ identifier: "TransferInitiate" })

export type TransferInitiate = Schema.Schema.Type<typeof TransferInitiate>

export function TransferInitiateFromJSON(json: unknown): TransferInitiate {
  return TransferInitiateFromJSONTyped(json)
}

export function TransferInitiateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): TransferInitiate {
  return Schema.decodeUnknownSync(TransferInitiate)(json)
}

export function TransferInitiateToJSON(value?: TransferInitiate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferInitiate)(value)
}
