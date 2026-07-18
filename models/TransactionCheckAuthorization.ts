import { Schema } from "effect"

export const TransactionCheckAuthorization = Schema.Struct({
  email: Schema.String,
  amount: Schema.Number,
  authorizationCode: Schema.optionalKey(Schema.String),
  currency: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      authorizationCode: "authorization_code",
    }),
  )
  .annotate({ identifier: "TransactionCheckAuthorization" })

export type TransactionCheckAuthorization = Schema.Schema.Type<typeof TransactionCheckAuthorization>

export function TransactionCheckAuthorizationFromJSON(json: unknown): TransactionCheckAuthorization {
  return TransactionCheckAuthorizationFromJSONTyped(json)
}

export function TransactionCheckAuthorizationFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransactionCheckAuthorization {
  return Schema.decodeUnknownSync(TransactionCheckAuthorization)(json)
}

export function TransactionCheckAuthorizationToJSON(value?: TransactionCheckAuthorization | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransactionCheckAuthorization)(value)
}
