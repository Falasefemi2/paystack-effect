import { Schema } from "effect"

export const TransferRecipientUpdate = Schema.Struct({
  name: Schema.optionalKey(Schema.String),
  email: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      name: "name",
      email: "email",
    }),
  )
  .annotate({ identifier: "TransferRecipientUpdate" })

export type TransferRecipientUpdate = Schema.Schema.Type<typeof TransferRecipientUpdate>

export function TransferRecipientUpdateFromJSON(json: unknown): TransferRecipientUpdate {
  return TransferRecipientUpdateFromJSONTyped(json)
}

export function TransferRecipientUpdateFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): TransferRecipientUpdate {
  return Schema.decodeUnknownSync(TransferRecipientUpdate)(json)
}

export function TransferRecipientUpdateToJSON(value?: TransferRecipientUpdate | null): unknown {
  if (value === undefined) return undefined
  if (value === null) return null
  return Schema.encodeSync(TransferRecipientUpdate)(value)
}
