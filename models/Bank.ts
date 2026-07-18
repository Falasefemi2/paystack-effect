import { Schema } from "effect"

export const Bank = Schema.Struct({
  code: Schema.optionalKey(Schema.String),
  accountNumber: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      accountNumber: "account_number",
    }),
  )
  .annotate({ identifier: "Bank" })

export type Bank = Schema.Schema.Type<typeof Bank>

export function BankFromJSON(json: unknown): Bank {
  return BankFromJSONTyped(json)
}

export function BankFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): Bank {
  return Schema.decodeUnknownSync(Bank)(json)
}

export function BankToJSON(value?: Bank | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(Bank)(value)
}
