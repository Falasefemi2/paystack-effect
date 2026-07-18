import { Schema } from "effect"

export const TransferFinalize = Schema.Struct({
  transferCode: Schema.String,
  otp: Schema.String,
}).annotate({ identifier: "TransferFinalize" })

export type TransferFinalize = Schema.Schema.Type<typeof TransferFinalize>

export function TransferFinalizeFromJSON(json: unknown): TransferFinalize {
  return TransferFinalizeFromJSONTyped(json)
}

export function TransferFinalizeFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): TransferFinalize {
  return Schema.decodeUnknownSync(TransferFinalize)(json)
}

export function TransferFinalizeToJSON(value?: TransferFinalize | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferFinalize)(value)
}
