import { Schema } from "effect"

export const TransferRecipientCreate = Schema.Struct({
  type: Schema.String,
  name: Schema.String,
  accountNumber: Schema.String,
  bankCode: Schema.String,
  description: Schema.optionalKey(Schema.String),
  currency: Schema.optionalKey(Schema.String),
  authorizationCode: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      bankCode: "bank_code",
      accountNumber: "account_number",
    }),
  )
  .annotate({ identifier: "TransferRecipientCreate" })

export type TransferRecipientCreate = Schema.Schema.Type<typeof TransferRecipientCreate>

export function TransferRecipientCreateFromJSON(json: unknown): TransferRecipientCreate {
  return TransferRecipientCreateFromJSONTyped(json)
}

export function TransferRecipientCreateFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransferRecipientCreate {
  return Schema.decodeUnknownSync(TransferRecipientCreate)(json)
}

export function TransferRecipientCreateToJSON(value?: TransferRecipientCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferRecipientCreate)(value)
}
