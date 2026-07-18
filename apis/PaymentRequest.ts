import { Context, Effect, Layer } from "effect"
import { PaymentRequestCreateToJSON, PaymentRequestUpdateToJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface ArchiveRequest {
  readonly id: string
}

export interface CreateRequest {
  readonly customer: string
  readonly amount?: number
  readonly currency?: string
  readonly dueDate?: Date
  readonly description?: string
  readonly lineItems?: ReadonlyArray<Record<string, unknown>>
  readonly tax?: ReadonlyArray<Record<string, unknown>>
  readonly sendNotification?: boolean
  readonly draft?: boolean
  readonly hasInvoice?: boolean
  readonly invoiceNumber?: number
  readonly splitCode?: string
}

export interface FetchRequest {
  readonly id: string
}

export interface FinalizeRequest {
  readonly id: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly customer?: string
  readonly status?: string
  readonly currency?: string
  readonly from?: Date
  readonly to?: Date
}

export interface NotifyRequest {
  readonly id: string
}

export interface UpdateRequest {
  readonly id: string
  readonly customer?: string
  readonly amount?: number
  readonly currency?: string
  readonly dueDate?: Date
  readonly description?: string
  readonly lineItems?: ReadonlyArray<Record<string, unknown>>
  readonly tax?: ReadonlyArray<Record<string, unknown>>
  readonly sendNotification?: boolean
  readonly draft?: boolean
  readonly hasInvoice?: boolean
  readonly invoiceNumber?: number
  readonly splitCode?: string
}

export interface VerifyRequest {
  readonly id: string
}

export interface Interface {
  readonly archive: (
    requestParameters: ArchiveRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly finalize: (
    requestParameters: FinalizeRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly notify: (
    requestParameters: NotifyRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly totals: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly update: (
    requestParameters: UpdateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly verify: (
    requestParameters: VerifyRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/PaymentRequest") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const archive = Effect.fn("PaymentRequest.archive")(function* (requestParameters: ArchiveRequest) {
      return yield* client.post(
        `/paymentrequest/archive/${encodeURIComponent(requestParameters.id)}`,
        Response,
        undefined,
      )
    })

    const create = Effect.fn("PaymentRequest.create")(function* (requestParameters: CreateRequest) {
      const body = PaymentRequestCreateToJSON({
        customer: requestParameters.customer,
        amount: requestParameters.amount,
        currency: requestParameters.currency,
        dueDate: requestParameters.dueDate,
        description: requestParameters.description,
        lineItems: requestParameters.lineItems,
        tax: requestParameters.tax,
        sendNotification: requestParameters.sendNotification,
        draft: requestParameters.draft,
        hasInvoice: requestParameters.hasInvoice,
        invoiceNumber: requestParameters.invoiceNumber,
        splitCode: requestParameters.splitCode,
      })

      return yield* client.post("/paymentrequest", Response, body)
    })

    const fetch = Effect.fn("PaymentRequest.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/paymentrequest/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const finalize = Effect.fn("PaymentRequest.finalize")(function* (requestParameters: FinalizeRequest) {
      return yield* client.post(
        `/paymentrequest/finalize/${encodeURIComponent(requestParameters.id)}`,
        Response,
        undefined,
      )
    })

    const list = Effect.fn("PaymentRequest.list")(function* (requestParameters: ListRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }
      if (requestParameters.customer !== undefined) {
        queryParameters.customer = requestParameters.customer
      }
      if (requestParameters.status !== undefined) {
        queryParameters.status = requestParameters.status
      }
      if (requestParameters.currency !== undefined) {
        queryParameters.currency = requestParameters.currency
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }

      return yield* client.get("/paymentrequest", Response, queryParameters)
    })

    const notify = Effect.fn("PaymentRequest.notify")(function* (requestParameters: NotifyRequest) {
      return yield* client.post(
        `/paymentrequest/notify/${encodeURIComponent(requestParameters.id)}`,
        Response,
        undefined,
      )
    })

    const totals = Effect.fn("PaymentRequest.totals")(function* () {
      return yield* client.get("/paymentrequest/totals", Response)
    })

    const update = Effect.fn("PaymentRequest.update")(function* (requestParameters: UpdateRequest) {
      const body = PaymentRequestUpdateToJSON({
        customer: requestParameters.customer,
        amount: requestParameters.amount,
        currency: requestParameters.currency,
        dueDate: requestParameters.dueDate,
        description: requestParameters.description,
        lineItems: requestParameters.lineItems,
        tax: requestParameters.tax,
        sendNotification: requestParameters.sendNotification,
        draft: requestParameters.draft,
        hasInvoice: requestParameters.hasInvoice,
        invoiceNumber: requestParameters.invoiceNumber,
        splitCode: requestParameters.splitCode,
      })

      return yield* client.put(`/paymentrequest/${encodeURIComponent(requestParameters.id)}`, Response, body)
    })

    const verify = Effect.fn("PaymentRequest.verify")(function* (requestParameters: VerifyRequest) {
      return yield* client.get(`/paymentrequest/verify/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    return Service.of({
      archive,
      create,
      fetch,
      finalize,
      list,
      notify,
      totals,
      update,
      verify,
    })
  }),
)

export * as PaymentRequest from "./PaymentRequest.js"
