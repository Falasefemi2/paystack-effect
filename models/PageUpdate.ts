import { Schema } from "effect"

export const PageUpdate = Schema.Struct({
  name: Schema.optionalKey(Schema.String),
  description: Schema.optionalKey(Schema.String),
  amount: Schema.optionalKey(Schema.Number),
  active: Schema.optionalKey(Schema.Boolean),
}).annotate({ identifier: "PageUpdate" })

export type PageUpdate = Schema.Schema.Type<typeof PageUpdate>

export function PageUpdateFromJSON(json: unknown): PageUpdate {
  return PageUpdateFromJSONTyped(json)
}

export function PageUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PageUpdate {
  return Schema.decodeUnknownSync(PageUpdate)(json)
}

export function PageUpdateToJSON(value?: PageUpdate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(PageUpdate)(value)
}
