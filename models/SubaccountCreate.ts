import { Schema } from "effect"

export const SubaccountCreate = Schema.Struct({
  businessName: Schema.String,
  settlementBank: Schema.String,
  accountNumber: Schema.String,
  percentageCharge: Schema.Number,
  description: Schema.optionalKey(Schema.String),
  primaryContactEmail: Schema.optionalKey(Schema.String),
  primaryContactName: Schema.optionalKey(Schema.String),
  primaryContactPhone: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      businessName: "business_name",
      settlementBank: "settlement_bank",
      accountNumber: "account_number",
      percentageCharge: "percentage_charge",
      primaryContactEmail: "primary_contact_email",
      primaryContactName: "primary_contact_name",
      primaryContactPhone: "primary_contact_phone",
    }),
  )
  .annotate({ identifier: "SubaccountCreate" })

export type SubaccountCreate = Schema.Schema.Type<typeof SubaccountCreate>

export function SubaccountCreateFromJSON(json: unknown): SubaccountCreate {
  return SubaccountCreateFromJSONTyped(json)
}

export function SubaccountCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SubaccountCreate {
  return Schema.decodeUnknownSync(SubaccountCreate)(json)
}

export function SubaccountCreateToJSON(value?: SubaccountCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SubaccountCreate)(value)
}
