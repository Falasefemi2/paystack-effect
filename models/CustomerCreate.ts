import { Schema } from "effect"

export const CustomerCreate = Schema.Struct({
  email: Schema.String,
  firstName: Schema.optionalKey(Schema.String),
  lastName: Schema.optionalKey(Schema.String),
  phone: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      firstName: "first_name",
      lastName: "last_name",
    }),
  )
  .annotate({ identifier: "CustomerCreate" })

export type CustomerCreate = Schema.Schema.Type<typeof CustomerCreate>

export function CustomerCreateFromJSON(json: unknown): CustomerCreate {
  return CustomerCreateFromJSONTyped(json)
}

export function CustomerCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): CustomerCreate {
  return Schema.decodeUnknownSync(CustomerCreate)(json)
}

export function CustomerCreateToJSON(value?: CustomerCreate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(CustomerCreate)(value)
}
