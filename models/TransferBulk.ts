import { Schema } from "effect"
import { TransferInitiate } from "./TransferInitiate.js"

export const TransferBulk = Schema.Struct({
  source: Schema.optionalKey(Schema.Literal("balance")),
  transfers: Schema.optionalKey(Schema.Array(TransferInitiate)),
}).annotate({ identifier: "TransferBulk" })

export type TransferBulk = Schema.Schema.Type<typeof TransferBulk>

export function TransferBulkFromJSON(json: unknown): TransferBulk {
  return TransferBulkFromJSONTyped(json)
}

export function TransferBulkFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): TransferBulk {
  return Schema.decodeUnknownSync(TransferBulk)(json)
}

export function TransferBulkToJSON(value?: TransferBulk | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferBulk)(value)
}
