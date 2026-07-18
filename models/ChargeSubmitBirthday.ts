import { Schema } from "effect"

export const ChargeSubmitBirthday = Schema.Struct({
  birthday: Schema.String,
  reference: Schema.String,
}).annotate({ identifier: "ChargeSubmitBirthday" })

export type ChargeSubmitBirthday = Schema.Schema.Type<typeof ChargeSubmitBirthday>

export function ChargeSubmitBirthdayFromJSON(json: unknown): ChargeSubmitBirthday {
  return ChargeSubmitBirthdayFromJSONTyped(json)
}

export function ChargeSubmitBirthdayFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeSubmitBirthday {
  return Schema.decodeUnknownSync(ChargeSubmitBirthday)(json)
}

export function ChargeSubmitBirthdayToJSON(value?: ChargeSubmitBirthday | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeSubmitBirthday)(value)
}
