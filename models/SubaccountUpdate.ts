import { Schema } from "effect"

export const SubaccountUpdate = Schema.Struct({
  businessName: Schema.optionalKey(Schema.String),
  settlementBank: Schema.optionalKey(Schema.String),
  accountNumber: Schema.optionalKey(Schema.String),
  active: Schema.optionalKey(Schema.Boolean),
  percentageCharge: Schema.optionalKey(Schema.Number),
  description: Schema.optionalKey(Schema.String),
  primaryContactEmail: Schema.optionalKey(Schema.String),
  primaryContactName: Schema.optionalKey(Schema.String),
  primaryContactPhone: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
}).pipe(
  Schema.encodeKeys({
    businessName: "business_name",
    accountNumber: "account_number",
    percentageCharge: "percentage_charge",
    primaryContactPhone: "primary_contact_phone",
  }),
)

export type SubaccountUpdate = Schema.Schema.Type<typeof SubaccountUpdate>

export function SubaccountUpdateFromJSON(json: unknown): SubaccountUpdate {
  return SubaccountUpdateFromJSONTyped(json)
}

export function SubaccountUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SubaccountUpdate {
  return Schema.decodeUnknownSync(SubaccountUpdate)(json)
}

export function SubaccountUpdateToJSON(value?: SubaccountUpdate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SubaccountUpdate)(value)
}
