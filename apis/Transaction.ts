import { Context, Effect, Layer } from "effect"
import {
  Response,
  TransactionChargeAuthorizationToJSON,
  TransactionCheckAuthorizationToJSON,
  TransactionInitializeToJSON,
  TransactionPartialDebitToJSON,
} from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface ChargeAuthorizationRequest {
  readonly email: string
  readonly amount: number
  readonly authorization_code: string
  readonly reference?: string
  readonly currency?: string
  readonly metadata?: string
  readonly split_code?: string
  readonly subaccount?: string
  readonly transaction_charge?: string
  readonly bearer?: string
  readonly queue?: boolean
}

export interface CheckAuthorizationRequest {
  readonly email: string
  readonly amount: number
  readonly authorization_code?: string
  readonly currency?: string
}

export interface DownloadRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface EventRequest {
  readonly id: string
}

export interface FetchRequest {
  readonly id: string
}

export interface InitializeRequest {
  readonly email: string
  readonly amount: number
  readonly currency?: string
  readonly reference?: string
  readonly callback_url?: string
  readonly plan?: string
  readonly invoice_limit?: number
  readonly metadata?: string
  readonly channels?: Array<string>
  readonly split_code?: string
  readonly subaccount?: string
  readonly transaction_charge?: string
  readonly bearer?: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface PartialDebitRequest {
  readonly email: string
  readonly amount: number
  readonly authorization_code: string
  readonly currency: string
  readonly reference?: string
  readonly at_least?: string
}

export interface SessionRequest {
  readonly id: string
}

export interface TimelineRequest {
  readonly id_or_reference: string
}

export interface TotalsRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface VerifyRequest {
  readonly reference: string
}

export interface Interface {
  readonly chargeAuthorization: (
    requestParameters: ChargeAuthorizationRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly checkAuthorization: (
    requestParameters: CheckAuthorizationRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly download: (
    requestParameters: DownloadRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly event: (
    requestParameters: EventRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly initialize: (
    requestParameters: InitializeRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly partialDebit: (
    requestParameters: PartialDebitRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly session: (
    requestParameters: SessionRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly timeline: (
    requestParameters: TimelineRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly totals: (
    requestParameters: TotalsRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly verify: (
    requestParameters: VerifyRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Transaction") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const chargeAuthorization = Effect.fn("Transaction.chargeAuthorization")(function* (
      requestParameters: ChargeAuthorizationRequest,
    ) {
      const body = TransactionChargeAuthorizationToJSON({
        email: requestParameters.email,
        amount: requestParameters.amount,
        authorizationCode: requestParameters.authorization_code,
        reference: requestParameters.reference,
        currency: requestParameters.currency,
        metadata: requestParameters.metadata,
        splitCode: requestParameters.split_code,
        subaccount: requestParameters.subaccount,
        transactionCharge: requestParameters.transaction_charge,
        bearer: requestParameters.bearer,
        queue: requestParameters.queue,
      })

      return yield* client.post("/transaction/charge_authorization", Response, body)
    })

    const checkAuthorization = Effect.fn("Transaction.checkAuthorization")(function* (
      requestParameters: CheckAuthorizationRequest,
    ) {
      const body = TransactionCheckAuthorizationToJSON({
        email: requestParameters.email,
        amount: requestParameters.amount,
        authorizationCode: requestParameters.authorization_code,
        currency: requestParameters.currency,
      })

      return yield* client.post("/transaction/check_authorization", Response, body)
    })

    const download = Effect.fn("Transaction.download")(function* (requestParameters: DownloadRequest) {
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

      return yield* client.get("/transaction/export", Response, queryParameters)
    })

    const event = Effect.fn("Transaction.event")(function* (requestParameters: EventRequest) {
      return yield* client.get(`/transaction/${encodeURIComponent(requestParameters.id)}/event`, Response)
    })

    const fetch = Effect.fn("Transaction.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/transaction/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const initialize = Effect.fn("Transaction.initialize")(function* (requestParameters: InitializeRequest) {
      const body = TransactionInitializeToJSON({
        email: requestParameters.email,
        amount: requestParameters.amount,
        currency: requestParameters.currency,
        reference: requestParameters.reference,
        callbackUrl: requestParameters.callback_url,
        plan: requestParameters.plan,
        invoiceLimit: requestParameters.invoice_limit,
        metadata: requestParameters.metadata,
        channels: requestParameters.channels,
        splitCode: requestParameters.split_code,
        subaccount: requestParameters.subaccount,
        transactionCharge: requestParameters.transaction_charge,
        bearer: requestParameters.bearer,
      })

      return yield* client.post("/transaction/initialize", Response, body)
    })

    const list = Effect.fn("Transaction.list")(function* (requestParameters: ListRequest) {
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

      return yield* client.get("/transaction", Response, queryParameters)
    })

    const partialDebit = Effect.fn("Transaction.partialDebit")(function* (requestParameters: PartialDebitRequest) {
      const body = TransactionPartialDebitToJSON({
        email: requestParameters.email,
        amount: requestParameters.amount,
        authorizationCode: requestParameters.authorization_code,
        currency: requestParameters.currency,
        reference: requestParameters.reference,
        atLeast: requestParameters.at_least,
      })

      return yield* client.post("/transaction/partial_debit", Response, body)
    })

    const session = Effect.fn("Transaction.session")(function* (requestParameters: SessionRequest) {
      return yield* client.get(`/transaction/${encodeURIComponent(requestParameters.id)}/session`, Response)
    })

    const timeline = Effect.fn("Transaction.timeline")(function* (requestParameters: TimelineRequest) {
      return yield* client.get(
        `/transaction/timeline/${encodeURIComponent(requestParameters.id_or_reference)}`,
        Response,
      )
    })

    const totals = Effect.fn("Transaction.totals")(function* (requestParameters: TotalsRequest) {
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

      return yield* client.get("/transaction/totals", Response, queryParameters)
    })

    const verify = Effect.fn("Transaction.verify")(function* (requestParameters: VerifyRequest) {
      return yield* client.get(`/transaction/verify/${encodeURIComponent(requestParameters.reference)}`, Response)
    })

    return Service.of({
      chargeAuthorization,
      checkAuthorization,
      download,
      event,
      fetch,
      initialize,
      list,
      partialDebit,
      session,
      timeline,
      totals,
      verify,
    })
  }),
)

export * as Transaction from "./Transaction.js"
