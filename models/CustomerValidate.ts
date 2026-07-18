import { Schema } from "effect"

export const CustomerValidate = Schema.Struct({
  firstName: Schema.String,
  lastName: Schema.String,
  type: Schema.String,
  value: Schema.String,
  country: Schema.String,
}).annotate({ identifier: "CustomerValidate" })

export type CustomerValidate = Schema.Schema.Type<typeof CustomerValidate>

export function CustomerValidateFromJSON(json: unknown): CustomerValidate {
  return CustomerValidateFromJSONTyped(json)
}

export function CustomerValidateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): CustomerValidate {
  return Schema.decodeUnknownSync(CustomerValidate)(json)
}

export function CustomerValidateToJSON(value?: CustomerValidate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(CustomerValidate)(value)
}
