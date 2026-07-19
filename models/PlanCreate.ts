import { Schema } from "effect"
import { PlanInterval } from "../common.js"

export const PlanCreate = Schema.Struct({
  name: Schema.String,
  amount: Schema.Number,
  interval: PlanInterval,
  description: Schema.optionalKey(Schema.String),
  sendInvoices: Schema.optionalKey(Schema.Boolean),
  sendSms: Schema.optionalKey(Schema.Boolean),
  currency: Schema.optionalKey(Schema.String),
  invoiceLimit: Schema.optionalKey(Schema.Number),
})
  .pipe(
    Schema.encodeKeys({
      sendInvoices: "send_invoices",
      sendSms: "send_sms",
      invoiceLimit: "invoice_limit",
    }),
  )
  .annotate({ identifier: "PlanCreate" })

export type PlanCreate = Schema.Schema.Type<typeof PlanCreate>

export function PlanCreateFromJSON(json: unknown): PlanCreate {
  return PlanCreateFromJSONTyped(json)
}

export function PlanCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PlanCreate {
  return Schema.decodeUnknownSync(PlanCreate)(json)
}

export function PlanCreateToJSON(value?: PlanCreate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(PlanCreate)(value)
}
