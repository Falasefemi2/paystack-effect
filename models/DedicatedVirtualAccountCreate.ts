import { Schema } from "effect"

export const DedicatedVirtualAccountCreate = Schema.Struct({
  customer: Schema.String,
  preferredBank: Schema.optionalKey(Schema.String),
  subaccount: Schema.optionalKey(Schema.String),
  splitCode: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      preferredBank: "preferred_bank",
      splitCode: "split_code",
    }),
  )
  .annotate({ identifier: "DedicatedVirtualAccountCreate" })

export type DedicatedVirtualAccountCreate = Schema.Schema.Type<typeof DedicatedVirtualAccountCreate>

export function DedicatedVirtualAccountCreateFromJSON(json: unknown): DedicatedVirtualAccountCreate {
  return DedicatedVirtualAccountCreateFromJSONTyped(json)
}

export function DedicatedVirtualAccountCreateFromJSONTyped(
  json: unknown,
  _ignoreDiscriminator?: boolean,
): DedicatedVirtualAccountCreate {
  return Schema.decodeUnknownSync(DedicatedVirtualAccountCreate)(json)
}

export function DedicatedVirtualAccountCreateToJSON(value?: DedicatedVirtualAccountCreate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(DedicatedVirtualAccountCreate)(value)
}
