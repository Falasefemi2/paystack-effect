import { Schema } from "effect"

export const BulkChargeInitiate = Schema.Struct({
  authorization: Schema.optional(Schema.String),
  amount: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "BulkChargeInitiate" })

export type BulkChargeInitiate = Schema.Schema.Type<typeof BulkChargeInitiate>

export function BulkChargeInitiateFromJSON(json: unknown): BulkChargeInitiate {
  return BulkChargeInitiateFromJSONTyped(json)
}

export function BulkChargeInitiateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): BulkChargeInitiate {
  return Schema.decodeUnknownSync(BulkChargeInitiate)(json)
}

export function BulkChargeInitiateToJSON(value?: BulkChargeInitiate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(BulkChargeInitiate)(value)
}
