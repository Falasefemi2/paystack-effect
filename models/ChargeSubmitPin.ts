import { Schema } from "effect"

export const ChargeSubmitPin = Schema.Struct({
  pin: Schema.String,
  reference: Schema.String,
}).annotate({ identifier: "ChargeSubmitPin" })

export type ChargeSubmitPin = Schema.Schema.Type<typeof ChargeSubmitPin>

export function ChargeSubmitPinFromJSON(json: unknown): ChargeSubmitPin {
  return ChargeSubmitPinFromJSONTyped(json)
}

export function ChargeSubmitPinFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeSubmitPin {
  return Schema.decodeUnknownSync(ChargeSubmitPin)(json)
}

export function ChargeSubmitPinToJSON(value?: ChargeSubmitPin | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeSubmitPin)(value)
}
