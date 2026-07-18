import { Schema } from "effect"
import { DateFromString } from "../common"

export const PaymentRequestUpdate = Schema.Struct({
  customer: Schema.optionalKey(Schema.String),
  amount: Schema.optionalKey(Schema.Number),
  currency: Schema.optionalKey(Schema.String),
  dueDate: Schema.optionalKey(DateFromString),
  description: Schema.optionalKey(Schema.String),
  lineItems: Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  tax: Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  // Same source-spec bug as PaymentRequestCreate: generated as Array<object>,
  // but JSDoc describes boolean semantics. Verify against real Paystack payloads.
  sendNotification: Schema.optionalKey(Schema.Boolean),
  draft: Schema.optionalKey(Schema.Boolean),
  hasInvoice: Schema.optionalKey(Schema.Boolean),
  invoiceNumber: Schema.optionalKey(Schema.Number),
  splitCode: Schema.optionalKey(Schema.String),
})
  .pipe(
    Schema.encodeKeys({
      dueDate: "due_date",
      lineItems: "line_items",
      sendNotification: "send_notification",
      hasInvoice: "has_invoice",
      invoiceNumber: "invoice_number",
      splitCode: "split_code",
    }),
  )
  .annotate({ identifier: "PaymentRequestUpdate" })

export type PaymentRequestUpdate = Schema.Schema.Type<typeof PaymentRequestUpdate>

export function PaymentRequestUpdateFromJSON(json: unknown): PaymentRequestUpdate {
  return PaymentRequestUpdateFromJSONTyped(json)
}

export function PaymentRequestUpdateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PaymentRequestUpdate {
  return Schema.decodeUnknownSync(PaymentRequestUpdate)(json)
}

export function PaymentRequestUpdateToJSON(value?: PaymentRequestUpdate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(PaymentRequestUpdate)(value)
}
