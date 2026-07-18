import { Schema } from "effect"

export const PageProduct = Schema.Struct({
  product: Schema.Array(Schema.String),
}).annotate({ identifier: "PageProduct" })

export type PageProduct = Schema.Schema.Type<typeof PageProduct>

export function PageProductFromJSON(json: unknown): PageProduct {
  return PageProductFromJSONTyped(json)
}

export function PageProductFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PageProduct {
  return Schema.decodeUnknownSync(PageProduct)(json)
}

export function PageProductToJSON(value?: PageProduct | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(PageProduct)(value)
}
