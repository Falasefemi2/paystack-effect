import { Schema } from "effect"

export const DisputeUpdate = Schema.Struct({
  refundAmount: Schema.String,
  uploadedFilename: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      refundAmount: "refund_amount",
      uploadedFilename: "uploaded_filename",
    }),
  )
  .annotate({ identifier: "DisputeUpdate" })

export type DisputeUpdate = Schema.Schema.Type<typeof DisputeUpdate>

export function DisputeUpdateFromJSON(json: unknown): DisputeUpdate {
  return DisputeUpdateFromJSONTyped(json)
}

export function DisputeUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): DisputeUpdate {
  return Schema.decodeUnknownSync(DisputeUpdate)(json)
}

export function DisputeUpdateToJSON(value?: DisputeUpdate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(DisputeUpdate)(value)
}
