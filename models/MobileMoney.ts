import { Schema } from "effect"

export const MobileMoney = Schema.Struct({
  phone: Schema.optionalKey(Schema.String),
  provider: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "MobileMoney" })

export type MobileMoney = Schema.Schema.Type<typeof MobileMoney>

export function MobileMoneyFromJSON(json: unknown): MobileMoney {
  return MobileMoneyFromJSONTyped(json)
}

export function MobileMoneyFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): MobileMoney {
  return Schema.decodeUnknownSync(MobileMoney)(json)
}

export function MobileMoneyToJSON(value?: MobileMoney | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(MobileMoney)(value)
}
