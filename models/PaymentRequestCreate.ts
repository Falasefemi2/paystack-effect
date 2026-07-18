import { Schema } from "effect"
import { DateFromString } from "../common"

export const PaymentRequestCreate = Schema.Struct({
  customer: Schema.String,
  amount: Schema.optionalKey(Schema.Number),
  currency: Schema.optionalKey(Schema.String),
  dueDate: Schema.optionalKey(DateFromString),
  description: Schema.optionalKey(Schema.String),
  lineItems: Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  tax: Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  // NOTE: original generated interface typed these as Array<object>, but every
  // JSDoc description describes boolean semantics. Treating as Boolean —
  // verify against Paystack's actual request/response examples.
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
  .annotate({ identifier: "PaymentRequestCreate" })

export type PaymentRequestCreate = Schema.Schema.Type<typeof PaymentRequestCreate>

export function PaymentRequestCreateFromJSON(json: unknown): PaymentRequestCreate {
  return PaymentRequestCreateFromJSONTyped(json)
}

export function PaymentRequestCreateFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): PaymentRequestCreate {
  return Schema.decodeUnknownSync(PaymentRequestCreate)(json)
}

export function PaymentRequestCreateToJSON(value?: PaymentRequestCreate | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(PaymentRequestCreate)(value)
}
