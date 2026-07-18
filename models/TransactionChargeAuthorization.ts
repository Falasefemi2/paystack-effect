import { Schema } from "effect"

export const TransactionChargeAuthorization = Schema.Struct({
  email: Schema.String,
  amount: Schema.Number,
  authorizationCode: Schema.String,
  reference: Schema.optionalKey(Schema.String),
  currency: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
  splitCode: Schema.optionalKey(Schema.String),
  subaccount: Schema.optionalKey(Schema.String),
  transactionCharge: Schema.optionalKey(Schema.String),
  bearer: Schema.optionalKey(Schema.String),
  queue: Schema.optionalKey(Schema.Boolean),
})

export type TransactionChargeAuthorization = Schema.Schema.Type<typeof TransactionChargeAuthorization>

export function TransactionChargeAuthorizationFromJSON(json: unknown): TransactionChargeAuthorization {
  return TransactionChargeAuthorizationFromJSONTyped(json)
}

export function TransactionChargeAuthorizationFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransactionChargeAuthorization {
  return Schema.decodeUnknownSync(TransactionChargeAuthorization)(json)
}

export function TransactionChargeAuthorizationToJSON(value?: TransactionChargeAuthorization | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransactionChargeAuthorization)(value)
}
