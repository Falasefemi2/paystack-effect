import { Schema } from "effect"

export const CustomerUpdate = Schema.Struct({
  firstName: Schema.optionalKey(Schema.String),
  lastName: Schema.optionalKey(Schema.String),
  phone: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "CustomerUpdate" })

export type CustomerUpdate = Schema.Schema.Type<typeof CustomerUpdate>

export function CustomerUpdateFromJSON(json: unknown): CustomerUpdate {
  return CustomerUpdateFromJSONTyped(json)
}

export function CustomerUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): CustomerUpdate {
  return Schema.decodeUnknownSync(CustomerUpdate)(json)
}

export function CustomerUpdateToJSON(value?: CustomerUpdate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(CustomerUpdate)(value)
}
