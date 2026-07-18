import { Context, Effect, Layer } from "effect"
import { type BulkChargeInitiate, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface ChargesRequest {
  readonly code: string
}

export interface FetchRequest {
  readonly code: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface PauseRequest {
  readonly code: string
}

export interface ResumeRequest {
  readonly code: string
}

export interface Interface {
  readonly charges: (
    requestParameters: ChargesRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly initiate: (
    body: ReadonlyArray<BulkChargeInitiate>,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly pause: (
    requestParameters: PauseRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly resume: (
    requestParameters: ResumeRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/BulkCharge") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const charges = Effect.fn("BulkCharge.charges")(function* (requestParameters: ChargesRequest) {
      return yield* client.get(`/bulkcharge/${encodeURIComponent(requestParameters.code)}/charges`, Response)
    })

    const fetch = Effect.fn("BulkCharge.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/bulkcharge/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const initiate = Effect.fn("BulkCharge.initiate")(function* (body: ReadonlyArray<BulkChargeInitiate>) {
      return yield* client.post("/bulkcharge", Response, body)
    })

    const list = Effect.fn("BulkCharge.list")(function* (requestParameters: ListRequest) {
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

      return yield* client.get("/bulkcharge", Response, queryParameters)
    })

    const pause = Effect.fn("BulkCharge.pause")(function* (requestParameters: PauseRequest) {
      return yield* client.get(`/bulkcharge/pause/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const resume = Effect.fn("BulkCharge.resume")(function* (requestParameters: ResumeRequest) {
      return yield* client.get(`/bulkcharge/resume/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    return Service.of({ charges, fetch, initiate, list, pause, resume })
  }),
)

export * as BulkCharge from "./BulkCharge.js"
