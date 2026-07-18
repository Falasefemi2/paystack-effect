import { Schema } from "effect"

export const SubscriptionCreate = Schema.Struct({
  customer: Schema.String,
  plan: Schema.String,
  authorization: Schema.optionalKey(Schema.String),
  startDate: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      startDate: "start_date",
    }),
  )
  .annotate({ identifier: "SubscriptionCreate" })

export type SubscriptionCreate = Schema.Schema.Type<typeof SubscriptionCreate>

export function SubscriptionCreateFromJSON(json: unknown): SubscriptionCreate {
  return SubscriptionCreateFromJSONTyped(json)
}

export function SubscriptionCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SubscriptionCreate {
  return Schema.decodeUnknownSync(SubscriptionCreate)(json)
}

export function SubscriptionCreateToJSON(value?: SubscriptionCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SubscriptionCreate)(value)
}
