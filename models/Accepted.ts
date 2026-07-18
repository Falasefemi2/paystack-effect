import { Schema } from "effect"

export const Accepted = Schema.Struct({
  status: Schema.optionalKey(Schema.Boolean),
  message: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "Accepted" })

export interface Accepted extends Schema.Schema.Type<typeof Accepted> {}

export function AcceptedFromJSON(json: unknown): Accepted {
  return AcceptedFromJSONTyped(json)
}

export function AcceptedFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): Accepted {
  return Schema.decodeUnknownSync(Accepted)(json)
}

export function AcceptedToJSON(value?: Accepted | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(Accepted)(value)
}
