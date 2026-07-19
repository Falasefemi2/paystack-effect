import { Context, Effect, Layer } from "effect"
import { PlanCreateFromJSON, PlanUpdateFromJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CreateRequest {
  readonly name: string
  readonly amount: number
  readonly interval: string
  readonly description?: string
  readonly send_invoices?: boolean
  readonly send_sms?: boolean
  readonly currency?: string
  readonly invoice_limit?: number
}

export interface FetchRequest {
  readonly code: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly interval?: string
  readonly amount?: number
  readonly from?: Date
  readonly to?: Date
}

export interface UpdateRequest {
  readonly code: string
  readonly name?: string
  readonly amount?: number
  readonly interval?: string
  readonly description?: boolean
  readonly send_invoices?: boolean
  readonly send_sms?: boolean
  readonly currency?: string
  readonly invoice_limit?: number
}

export interface Interface {
  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
  readonly update: (
    requestParameters: UpdateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Plan/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const create = Effect.fn("Plan.create")(function* (requestParameters: CreateRequest) {
      const body = PlanCreateFromJSON({
        name: requestParameters.name,
        amount: requestParameters.amount,
        interval: requestParameters.interval,
        description: requestParameters.description,
        sendInvoices: requestParameters.send_invoices,
        sendSms: requestParameters.send_sms,
        currency: requestParameters.currency,
        invoiceLimit: requestParameters.invoice_limit,
      })

      return yield* client.post("/plan", Response, body)
    })

    const fetch = Effect.fn("Plan.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/plan/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const list = Effect.fn("Plan.list")(function* (requestParameters: ListRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}
      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }
      if (requestParameters.amount !== undefined) {
        queryParameters.amount = requestParameters.amount
      }
      if (requestParameters.interval !== undefined) {
        queryParameters.interval = requestParameters.interval
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }
      return yield* client.get("/plan", Response, queryParameters)
    })

    const update = Effect.fn("Plan.update")(function* (requestParameters: UpdateRequest) {
      const body = PlanUpdateFromJSON({
        name: requestParameters.name,
        amount: requestParameters.amount,
        interval: requestParameters.interval,
        description: requestParameters.description,
        sendInvoices: requestParameters.send_invoices,
        sendSms: requestParameters.send_sms,
        currency: requestParameters.currency,
        invoiceLimit: requestParameters.invoice_limit,
      })
      return yield* client.put(`/plan/${encodeURIComponent(requestParameters.code)}`, Response, body)
    })

    return Service.of({
      create,
      fetch,
      list,
      update,
    })
  }),
)
