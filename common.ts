import { Schema, SchemaGetter } from "effect"

export const Currency = Schema.Literals(["NGN", "GHS", "ZAR", "USD"]).annotate({
  identifier: "Currency",
})

export type Currency = Schema.Schema.Type<typeof Currency>

export const DateFromString = Schema.String.pipe(
  Schema.decodeTo(Schema.Date, {
    decode: SchemaGetter.transform((s: string) => new Date(s)),
    encode: SchemaGetter.transform((d: Date) => d.toISOString()),
  }),
).annotate({
  identifier: "DateFromString",
})

export type DateFromString = Schema.Schema.Type<typeof DateFromString>

export const PlanInterval = Schema.Literals(["daily", "weekly", "monthly", "biannually", "annually"]).annotate({
  identifier: "PlanInterval",
})

export type PlanInterval = Schema.Schema.Type<typeof PlanInterval>
