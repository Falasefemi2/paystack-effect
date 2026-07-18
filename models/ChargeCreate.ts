import { Schema } from "effect"

export const ChargeCreate = Schema.Struct({
  email: Schema.String,
  amount: Schema.String,
  authorizationCode: Schema.optionalKey(Schema.String),
  pin: Schema.optionalKey(Schema.String),
  reference: Schema.optionalKey(Schema.String),
  birthday: Schema.optionalKey(Schema.Date),
  deviceId: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      authorizationCode: "authorization_code",
      deviceId: "device_id",
    }),
  )
  .annotate({ identifier: "ChargeCreate" })

export type ChargeCreate = Schema.Schema.Type<typeof ChargeCreate>

export function ChargeCreateFromJSON(json: unknown): ChargeCreate {
  return ChargeCreateFromJSONTyped(json)
}

export function ChargeCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ChargeCreate {
  return Schema.decodeUnknownSync(ChargeCreate)(json)
}

export function ChargeCreateToJSON(value?: ChargeCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ChargeCreate)(value)
}
