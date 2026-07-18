import { Schema } from "effect"
import { SplitSubaccounts } from "./SplitSubaccounts"

export const SplitCreate = Schema.Struct({
  name: Schema.String,
  type: Schema.String,
  subaccounts: Schema.Array(SplitSubaccounts),
  currency: Schema.String,
  bearerType: Schema.optionalKey(Schema.String),
  bearerSubaccount: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      bearerType: "bearer_type",
      bearerSubaccount: "bearer_subaccount",
    }),
  )
  .annotate({ identifier: "SplitCreate" })

export type SplitCreate = Schema.Schema.Type<typeof SplitCreate>

export function SplitCreateFromJSON(json: unknown): SplitCreate {
  return SplitCreateFromJSONTyped(json)
}

export function SplitCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SplitCreate {
  return Schema.decodeUnknownSync(SplitCreate)(json)
}

export function SplitCreateToJSON(value?: SplitCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SplitCreate)(value)
}
