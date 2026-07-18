import { Schema } from "effect"

export const TransferResendOTP = Schema.Struct({
  transferCode: Schema.String,
  reason: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      transferCode: "transfer_code",
      reason: "reason",
    }),
  )
  .annotate({ identifier: "TransferResendOTP" })

export type TransferResendOTP = Schema.Schema.Type<typeof TransferResendOTP>

export function TransferResendOTPFromJSON(json: unknown): TransferResendOTP {
  return TransferResendOTPFromJSONTyped(json)
}

export function TransferResendOTPFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): TransferResendOTP {
  return Schema.decodeUnknownSync(TransferResendOTP)(json)
}

export function TransferResendOTPToJSON(value?: TransferResendOTP | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferResendOTP)(value)
}
