import { Schema } from "effect"

export const ChargeSubmitAddress = Schema.Struct({
  address: Schema.String,
  city: Schema.String,
  state: Schema.String,
  zipcode: Schema.String,
  reference: Schema.String,
}).annotate({ identifier: "ChargeSubmitAddress" })

export type ChargeSubmitAddress = Schema.Schema.Type<typeof ChargeSubmitAddress>

export function ChargeSubmitAddressFromJSON(json: unknown): ChargeSubmitAddress {
  return ChargeSubmitAddressFromJSONTyped(json)
}

export function ChargeSubmitAddressFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeSubmitAddress {
  return Schema.decodeUnknownSync(ChargeSubmitAddress)(json)
}

export function ChargeSubmitAddressToJSON(value?: ChargeSubmitAddress | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeSubmitAddress)(value)
}
