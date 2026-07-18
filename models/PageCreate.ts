import { Schema } from "effect"

export const PageCreate = Schema.Struct({
  name: Schema.String,
  description: Schema.optionalKey(Schema.String),
  amount: Schema.optionalKey(Schema.Number),
  slug: Schema.optionalKey(Schema.String),
  metadata: Schema.optionalKey(Schema.String),
  redirectUrl: Schema.optionalKey(Schema.String),
  customFields: Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})
  .pipe(
    Schema.encodeKeys({
      redirectUrl: "redirect_url",
      customFields: "custom_fields",
    }),
  )
  .annotate({ identifier: "PageCreate" })

export type PageCreate = Schema.Schema.Type<typeof PageCreate>

export function PageCreateFromJSON(json: unknown): PageCreate {
  return PageCreateFromJSONTyped(json)
}

export function PageCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PageCreate {
  return Schema.decodeUnknownSync(PageCreate)(json)
}

export function PageCreateToJSON(value?: PageCreate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(PageCreate)(value)
}
