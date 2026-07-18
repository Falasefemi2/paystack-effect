import { Schema } from "effect"

export const SplitSubaccounts = Schema.Struct({
  subaccount: Schema.optionalKey(Schema.String),
  share: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "SplitSubaccounts" })

export type SplitSubaccounts = Schema.Schema.Type<typeof SplitSubaccounts>

export function SplitSubaccountsFromJSON(json: unknown): SplitSubaccounts {
  return SplitSubaccountsFromJSONTyped(json)
}

export function SplitSubaccountsFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): SplitSubaccounts {
  return Schema.decodeUnknownSync(SplitSubaccounts)(json)
}

export function SplitSubaccountsToJSON(value?: SplitSubaccounts | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(SplitSubaccounts)(value)
}
