import { Schema } from "effect"

export const TransactionPartialDebit = Schema.Struct({
  email: Schema.String,
  amount: Schema.Number,
  authorizationCode: Schema.String,
  currency: Schema.String,
  reference: Schema.optionalKey(Schema.String),
  atLeast: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      authorizationCode: "authorization_code",
      atLeast: "at_least",
    }),
  )
  .annotate({ identifier: "TransactionPartialDebit" })

export type TransactionPartialDebit = Schema.Schema.Type<typeof TransactionPartialDebit>

export function TransactionPartialDebitFromJSON(json: unknown): TransactionPartialDebit {
  return TransactionPartialDebitFromJSONTyped(json)
}

export function TransactionPartialDebitFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransactionPartialDebit {
  return Schema.decodeUnknownSync(TransactionPartialDebit)(json)
}

export function TransactionPartialDebitToJSON(value?: TransactionPartialDebit | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransactionPartialDebit)(value)
}
