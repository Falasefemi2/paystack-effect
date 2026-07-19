import { Schema } from "effect"
import { PlanInterval } from "../common.js"

export const PlanUpdate = Schema.Struct({
  name: Schema.optionalKey(Schema.String),
  amount: Schema.optionalKey(Schema.Number),
  interval: Schema.optionalKey(PlanInterval),
  // Source interface has this typed `boolean`, but JSDoc + PlanCreate's
  // matching field say string. Treating as string — verify against Paystack.
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
  .annotate({ identifier: "PlanUpdate" })

export type PlanUpdate = Schema.Schema.Type<typeof PlanUpdate>

export function PlanUpdateFromJSON(json: unknown): PlanUpdate {
  return PlanUpdateFromJSONTyped(json)
}

export function PlanUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PlanUpdate {
  return Schema.decodeUnknownSync(PlanUpdate)(json)
}

export function PlanUpdateToJSON(value?: PlanUpdate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(PlanUpdate)(value)
}
