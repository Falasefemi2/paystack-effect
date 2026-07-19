import { Schema } from "effect"
import { TransferRecipientCreate } from "./TransferRecipientCreate.js"

export const TransferRecipientBulk = Schema.Struct({
  batch: Schema.Array(TransferRecipientCreate),
}).annotate({ identifier: "TransferRecipientBulk" })

export type TransferRecipientBulk = Schema.Schema.Type<typeof TransferRecipientBulk>

export function TransferRecipientBulkFromJSON(json: unknown): TransferRecipientBulk {
  return TransferRecipientBulkFromJSONTyped(json)
}

export function TransferRecipientBulkFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransferRecipientBulk {
  return Schema.decodeUnknownSync(TransferRecipientBulk)(json)
}

export function TransferRecipientBulkToJSON(value?: TransferRecipientBulk | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(TransferRecipientBulk)(value)
}
