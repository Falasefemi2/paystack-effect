import { Schema } from "effect"

export const TransferFinalizeDisableOTP = Schema.Struct({
  otp: Schema.String,
}).annotate({ identifier: "TransferFinalizeDisableOTP" })

export type TransferFinalizeDisableOTP = Schema.Schema.Type<typeof TransferFinalizeDisableOTP>

export function TransferFinalizeDisableOTPFromJSON(json: unknown): TransferFinalizeDisableOTP {
  return TransferFinalizeDisableOTPFromJSONTyped(json)
}

export function TransferFinalizeDisableOTPFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransferFinalizeDisableOTP {
  return Schema.decodeUnknownSync(TransferFinalizeDisableOTP)(json)
}

export function TransferFinalizeDisableOTPToJSON(value?: TransferFinalizeDisableOTP | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferFinalizeDisableOTP)(value)
}
