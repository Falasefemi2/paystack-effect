import { Context, Effect, Layer } from "effect"
import { Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface FetchRequest {
  readonly perPage?: number
  readonly page?: number
}

export interface TransactionRequest {
  readonly id: string
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type SettlementEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly fetch: (requestParameters: FetchRequest) => SettlementEffect

  readonly transaction: (requestParameters: TransactionRequest) => SettlementEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Settlement/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const fetch = Effect.fn("Settlement.fetch")(function* (requestParameters: FetchRequest) {
      const queryParameters = {
        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),
      }

      return yield* client.get("/settlement", Response, queryParameters)
    })

    const transaction = Effect.fn("Settlement.transaction")(function* (requestParameters: TransactionRequest) {
      return yield* client.get(`/settlement/${encodeURIComponent(requestParameters.id)}/transaction`, Response)
    })

    return Service.of({
      fetch,
      transaction,
    })
  }),
)
