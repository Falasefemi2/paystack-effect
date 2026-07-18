import { Schema } from "effect"

export const SplitUpdate = Schema.Struct({
  name: Schema.optionalKey(Schema.String),
  active: Schema.optionalKey(Schema.Boolean),
  bearerType: Schema.optionalKey(Schema.String),
  bearerSubaccount: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      bearerType: "bearer_type",
      bearerSubaccount: "bearer_subaccount",
    }),
  )
  .annotate({ identifier: "SplitUpdate" })

export type SplitUpdate = Schema.Schema.Type<typeof SplitUpdate>

export function SplitUpdateFromJSON(json: unknown): SplitUpdate {
  return SplitUpdateFromJSONTyped(json)
}

export function SplitUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SplitUpdate {
  return Schema.decodeUnknownSync(SplitUpdate)(json)
}

export function SplitUpdateToJSON(value?: SplitUpdate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SplitUpdate)(value)
}
