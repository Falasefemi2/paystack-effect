import { Schema } from "effect"

export const VerificationBVNMatch = Schema.Struct({
  accountNumber: Schema.String,
  bankCode: Schema.Number,
  bvn: Schema.String,
  firstName: Schema.optionalKey(Schema.String),
  middleName: Schema.optionalKey(Schema.String),
  lastName: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      accountNumber: "account_number",
      bankCode: "bank_code",
      bvn: "bvn",
      firstName: "first_name",
      middleName: "middle_name",
      lastName: "last_name",
    }),
  )
  .annotate({ identifier: "VerificationBVNMatch" })

export type VerificationBVNMatch = Schema.Schema.Type<typeof VerificationBVNMatch>

export function VerificationBVNMatchFromJSON(json: unknown): VerificationBVNMatch {
  return VerificationBVNMatchFromJSONTyped(json)
}

export function VerificationBVNMatchFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): VerificationBVNMatch {
  return Schema.decodeUnknownSync(VerificationBVNMatch)(json)
}

export function VerificationBVNMatchToJSON(value?: VerificationBVNMatch | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(VerificationBVNMatch)(value)
}
