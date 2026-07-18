import { Schema } from "effect"

export const Currency = Schema.Literals(["NGN", "GHS", "ZAR", "USD"]).annotate({
  identifier: "Currency",
})

export type Currency = Schema.Schema.Type<typeof Currency>
