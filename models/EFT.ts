import { Schema } from "effect"

export const EFT = Schema.Struct({
  provider: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "EFT" })

export type EFT = Schema.Schema.Type<typeof EFT>

export function EFTFromJSON(json: unknown): EFT {
  return EFTFromJSONTyped(json)
}

export function EFTFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): EFT {
  return Schema.decodeUnknownSync(EFT)(json)
}

export function EFTToJSON(value?: EFT | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(EFT)(value)
}
