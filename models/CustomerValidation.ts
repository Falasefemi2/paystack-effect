import { Schema } from "effect"

export const CustomerValidation = Schema.Struct({
  firstName: Schema.String,
  lastName: Schema.String,
  type: Schema.String,
  country: Schema.String,
  bvn: Schema.String,
  bankCode: Schema.String,
  accountNumber: Schema.String,
  value: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "CustomerValidation" })

export type CustomerValidation = Schema.Schema.Type<typeof CustomerValidation>

export function CustomerValidationFromJSON(json: unknown): CustomerValidation {
  return CustomerValidationFromJSONTyped(json)
}

export function CustomerValidationFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): CustomerValidation {
  return Schema.decodeUnknownSync(CustomerValidation)(json)
}

export function CustomerValidationToJSON(value?: CustomerValidation | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(CustomerValidation)(value)
}
