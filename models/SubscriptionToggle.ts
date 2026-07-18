import { Schema } from "effect"

export const SubscriptionToggle = Schema.Struct({
  code: Schema.String,
  token: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      code: "code",
      token: "token",
    }),
  )
  .annotate({ identifier: "SubscriptionToggle" })

export type SubscriptionToggle = Schema.Schema.Type<typeof SubscriptionToggle>

export function SubscriptionToggleFromJSON(json: unknown): SubscriptionToggle {
  return SubscriptionToggleFromJSONTyped(json)
}

export function SubscriptionToggleFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SubscriptionToggle {
  return Schema.decodeUnknownSync(SubscriptionToggle)(json)
}

export function SubscriptionToggleToJSON(value?: SubscriptionToggle | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SubscriptionToggle)(value)
}
