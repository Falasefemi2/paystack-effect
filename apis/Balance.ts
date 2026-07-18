import { Context, Effect, Layer } from "effect"
import { Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface LedgerRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface Interface {
  readonly fetch: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >
  readonly ledger: (
    requestParameters: LedgerRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Balance") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const fetch = Effect.fn("Balance.fetch")(function* () {
      return yield* client.get("/balance", Response)
    })

    const ledger = Effect.fn("Balance.ledger")(function* (requestParameters: LedgerRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }

      return yield* client.get("/balance/ledger", Response, queryParameters)
    })

    return Service.of({ fetch, ledger })
  }),
)

export * as Balance from "./Balance.js"
