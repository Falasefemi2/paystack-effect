import { Schema } from "effect"

export const DisputeResolve = Schema.Struct({
  resolution: Schema.String,
  message: Schema.String,
  refundAmount: Schema.String,
  uploadedFilename: Schema.String,
  evidence: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      refundAmount: "refund_amount",
      uploadedFilename: "uploaded_filename",
    }),
  )
  .annotate({ identifier: "DisputeResolve" })

export type DisputeResolve = Schema.Schema.Type<typeof DisputeResolve>

export function DisputeResolveFromJSON(json: unknown): DisputeResolve {
  return DisputeResolveFromJSONTyped(json)
}

export function DisputeResolveFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): DisputeResolve {
  return Schema.decodeUnknownSync(DisputeResolve)(json)
}

export function DisputeResolveToJSON(value?: DisputeResolve | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(DisputeResolve)(value)
}
