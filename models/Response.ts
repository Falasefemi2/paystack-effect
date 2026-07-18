import { Schema } from "effect"

export const Response = Schema.Struct({
  status: Schema.optionalKey(Schema.Boolean),
  message: Schema.optionalKey(Schema.String),
  data: Schema.optionalKey(Schema.Record(Schema.String, Schema.Unknown)),
}).annotate({ identifier: "Response" })

export type Response = Schema.Schema.Type<typeof Response>

export function ResponseFromJSON(json: unknown): Response {
  return ResponseFromJSONTyped(json)
}

export function ResponseFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): Response {
  return Schema.decodeUnknownSync(Response)(json)
}

export function ResponseToJSON(value?: Response | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(Response)(value)
}
