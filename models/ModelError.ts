import { Schema } from "effect"

export const ModelError = Schema.Struct({
  status: Schema.optionalKey(Schema.Boolean),
  message: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "ModelError" })

export type ModelError = Schema.Schema.Type<typeof ModelError>

export function ModelErrorFromJSON(json: unknown): ModelError {
  return ModelErrorFromJSONTyped(json)
}

export function ModelErrorFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): ModelError {
  return Schema.decodeUnknownSync(ModelError)(json)
}

export function ModelErrorToJSON(value?: ModelError | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(ModelError)(value)
}
