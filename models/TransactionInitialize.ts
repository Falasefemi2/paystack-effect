import { Schema } from "effect"

export const TransactionInitialize = Schema.Struct({
  email: Schema.String,
  amount: Schema.Number,
  currency: Schema.optionalKey(Schema.String),
  reference: Schema.optionalKey(Schema.String),
  callbackUrl: Schema.optionalKey(Schema.String),
  plan: Schema.optionalKey(Schema.String),
  invoiceLimit: Schema.optionalKey(Schema.Number),
  metadata: Schema.optionalKey(Schema.String),
  channels: Schema.optionalKey(Schema.Array(Schema.String)),
  splitCode: Schema.optionalKey(Schema.String),
  subaccount: Schema.optionalKey(Schema.String),
  transactionCharge: Schema.optionalKey(Schema.String),
  bearer: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      callbackUrl: "callback_url",
      splitCode: "split_code",
      transactionCharge: "transaction_charge",
      invoiceLimit: "invoice_limit",
    }),
  )
  .annotate({ identifier: "TransactionInitialize" })

export type TransactionInitialize = Schema.Schema.Type<typeof TransactionInitialize>

export function TransactionInitializeFromJSON(json: unknown): TransactionInitialize {
  return TransactionInitializeFromJSONTyped(json)
}

export function TransactionInitializeFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransactionInitialize {
  return Schema.decodeUnknownSync(TransactionInitialize)(json)
}

export function TransactionInitializeToJSON(value?: TransactionInitialize | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransactionInitialize)(value)
}
