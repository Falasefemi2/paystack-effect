import { Schema } from "effect"

export const CustomerRiskAction = Schema.Struct({
  reference: Schema.String,
  riskAction: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      riskAction: "risk_action",
    }),
  )
  .annotate({ identifier: "CustomerRiskAction" })

export type CustomerRiskAction = Schema.Schema.Type<typeof CustomerRiskAction>

export function CustomerRiskActionFromJSON(json: unknown): CustomerRiskAction {
  return CustomerRiskActionFromJSONTyped(json)
}

export function CustomerRiskActionFromJSONTyped(json: unknown, _ignoreDiscriminator?: boolean): CustomerRiskAction {
  return Schema.decodeUnknownSync(CustomerRiskAction)(json)
}

export function CustomerRiskActionToJSON(value?: CustomerRiskAction | null): unknown {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return Schema.encodeSync(CustomerRiskAction)(value)
}
