import { Schema } from "effect"

export const CustomerDeactivateAuthorization = Schema.Struct({
  authorizationCode: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      authorizationCode: "authorization_code",
    }),
  )
  .annotate({ identifier: "CustomerDeactivateAuthorization" })

export type CustomerDeactivateAuthorization = Schema.Schema.Type<typeof CustomerDeactivateAuthorization>

export function CustomerDeactivateAuthorizationFromJSON(json: unknown): CustomerDeactivateAuthorization {
  return CustomerDeactivateAuthorizationFromJSONTyped(json)
}

export function CustomerDeactivateAuthorizationFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): CustomerDeactivateAuthorization {
  return Schema.decodeUnknownSync(CustomerDeactivateAuthorization)(json)
}

export function CustomerDeactivateAuthorizationToJSON(value?: CustomerDeactivateAuthorization | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(CustomerDeactivateAuthorization)(value)
}
