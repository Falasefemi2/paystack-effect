import { Schema } from "effect"

export const ChargeSubmitPhone = Schema.Struct({
  phone: Schema.String,
  reference: Schema.String,
}).annotate({ identifier: "ChargeSubmitPhone" })

export type ChargeSubmitPhone = Schema.Schema.Type<typeof ChargeSubmitPhone>

export function ChargeSubmitPhoneFromJSON(json: unknown): ChargeSubmitPhone {
  return ChargeSubmitPhoneFromJSONTyped(json)
}

export function ChargeSubmitPhoneFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeSubmitPhone {
  return Schema.decodeUnknownSync(ChargeSubmitPhone)(json)
}

export function ChargeSubmitPhoneToJSON(value?: ChargeSubmitPhone | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeSubmitPhone)(value)
}
