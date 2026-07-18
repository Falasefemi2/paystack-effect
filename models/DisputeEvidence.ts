import { Schema } from "effect"

export const DisputeEvidence = Schema.Struct({
  customerEmail: Schema.String,
  customerName: Schema.String,
  customerPhone: Schema.String,
  serviceDetails: Schema.String,
  deliveryAddress: Schema.optionalKey(Schema.String),
  deliveryDate: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "DisputeEvidence" })

export type DisputeEvidence = Schema.Schema.Type<typeof DisputeEvidence>

export function DisputeEvidenceFromJSON(json: unknown): DisputeEvidence {
  return DisputeEvidenceFromJSONTyped(json)
}

export function DisputeEvidenceFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): DisputeEvidence {
  return Schema.decodeUnknownSync(DisputeEvidence)(json)
}

export function DisputeEvidenceToJSON(value?: DisputeEvidence | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(DisputeEvidence)(value)
}
