import { Schema } from "effect"

export const USSD = Schema.Struct({
  type: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      type: "type",
    }),
  )
  .annotate({ identifier: "USSD" })

export type USSD = Schema.Schema.Type<typeof USSD>

export function USSDFromJSON(json: unknown): USSD {
  return USSDFromJSONTyped(json)
}

export function USSDFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): USSD {
  return Schema.decodeUnknownSync(USSD)(json)
}

export function USSDToJSON(value?: USSD | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(USSD)(value)
}
