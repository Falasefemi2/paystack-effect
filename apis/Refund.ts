import { Context, Effect, Layer } from "effect"
import { RefundCreateFromJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CreateRequest {
  readonly transaction: string
  readonly amount?: number
  readonly currency?: string
  readonly customer_note?: string
  readonly merchant_note?: string
}

export interface FetchRequest {
  readonly id: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type RefundEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly create: (requestParameters: CreateRequest) => RefundEffect

  readonly fetch: (requestParameters: FetchRequest) => RefundEffect

  readonly list: (requestParameters: ListRequest) => RefundEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Refund/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const create = Effect.fn("Refund.create")(function* (requestParameters: CreateRequest) {
      const body = RefundCreateFromJSON({
        transaction: requestParameters.transaction,
        amount: requestParameters.amount,
        currency: requestParameters.currency,
        customerNote: requestParameters.customer_note,
        merchantNote: requestParameters.merchant_note,
      })

      return yield* client.post("/refund", Response, body)
    })

    const fetch = Effect.fn("Refund.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/refund/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const list = Effect.fn("Refund.list")(function* (requestParameters: ListRequest) {
      const queryParameters = {
        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),

        ...(requestParameters.from !== undefined && {
          from: requestParameters.from.toISOString(),
        }),

        ...(requestParameters.to !== undefined && {
          to: requestParameters.to.toISOString(),
        }),
      }

      return yield* client.get("/refund", Response, queryParameters)
    })

    return Service.of({
      create,
      fetch,
      list,
    })
  }),
)
