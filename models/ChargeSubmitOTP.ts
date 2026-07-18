import { Schema } from "effect"

export const ChargeSubmitOTP = Schema.Struct({
  otp: Schema.String,
  reference: Schema.String,
}).annotate({ identifier: "ChargeSubmitOTP" })

export type ChargeSubmitOTP = Schema.Schema.Type<typeof ChargeSubmitOTP>

export function ChargeSubmitOTPFromJSON(json: unknown): ChargeSubmitOTP {
  return ChargeSubmitOTPFromJSONTyped(json)
}

export function ChargeSubmitOTPFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeSubmitOTP {
  return Schema.decodeUnknownSync(ChargeSubmitOTP)(json)
}

export function ChargeSubmitOTPToJSON(value?: ChargeSubmitOTP | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeSubmitOTP)(value)
}
