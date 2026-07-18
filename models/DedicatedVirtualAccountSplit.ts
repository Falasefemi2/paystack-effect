import { Schema } from "effect"

export const DedicatedVirtualAccountSplit = Schema.Struct({
  accountNumber: Schema.String,
  subaccount: Schema.optionalKey(Schema.String),
  splitCode: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "DedicatedVirtualAccountSplit" })

export type DedicatedVirtualAccountSplit = Schema.Schema.Type<typeof DedicatedVirtualAccountSplit>

export function DedicatedVirtualAccountSplitFromJSON(json: unknown): DedicatedVirtualAccountSplit {
  return DedicatedVirtualAccountSplitFromJSONTyped(json)
}

export function DedicatedVirtualAccountSplitFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): DedicatedVirtualAccountSplit {
  return Schema.decodeUnknownSync(DedicatedVirtualAccountSplit)(json)
}

export function DedicatedVirtualAccountSplitToJSON(value?: DedicatedVirtualAccountSplit | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(DedicatedVirtualAccountSplit)(value)
}
