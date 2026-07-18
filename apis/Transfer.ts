import { Context, Effect, Layer } from "effect"
import {
  Response,
  TransferBulkToJSON,
  TransferFinalizeDisableOTPToJSON,
  TransferFinalizeToJSON,
  type TransferInitiate,
  TransferInitiateToJSON,
  TransferResendOTPToJSON,
} from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface BulkRequest {
  readonly source?: string
  readonly transfers?: Array<TransferInitiate>
}

export interface DisableOtpFinalizeRequest {
  readonly otp: string
}

export interface DownloadRequest {
  readonly perPage?: number
  readonly page?: number
  readonly status?: string
  readonly from?: Date
  readonly to?: Date
}

export interface FetchRequest {
  readonly code: string
}

export interface FinalizeRequest {
  readonly transfer_code: string
  readonly otp: string
}

export interface InitiateRequest {
  readonly source: string
  readonly amount: string
  readonly recipient: string
  readonly reason?: string
  readonly currency?: string
  readonly reference?: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly status?: string
  readonly from?: Date
  readonly to?: Date
}

export interface ResendOtpRequest {
  readonly transfer_code: string
  readonly reason: string
}

export interface VerifyRequest {
  readonly reference: string
}

export interface Interface {
  readonly bulk: (
    requestParameters: BulkRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly disableOtp: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly disableOtpFinalize: (
    requestParameters: DisableOtpFinalizeRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly download: (
    requestParameters: DownloadRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly enableOtp: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly finalize: (
    requestParameters: FinalizeRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly initiate: (
    requestParameters: InitiateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly resendOtp: (
    requestParameters: ResendOtpRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly verify: (
    requestParameters: VerifyRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Transfer") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const bulk = Effect.fn("Transfer.bulk")(function* (requestParameters: BulkRequest) {
      const body = TransferBulkToJSON({
        source: requestParameters.source as "balance" | undefined,
        transfers: requestParameters.transfers,
      })

      return yield* client.post("/transfer/bulk", Response, body)
    })

    const disableOtp = Effect.fn("Transfer.disableOtp")(function* () {
      return yield* client.post("/transfer/disable_otp", Response, undefined)
    })

    const disableOtpFinalize = Effect.fn("Transfer.disableOtpFinalize")(function* (
      requestParameters: DisableOtpFinalizeRequest,
    ) {
      const body = TransferFinalizeDisableOTPToJSON({
        otp: requestParameters.otp,
      })

      return yield* client.post("/transfer/disable_otp_finalize", Response, body)
    })

    const download = Effect.fn("Transfer.download")(function* (requestParameters: DownloadRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }
      if (requestParameters.status !== undefined) {
        queryParameters.status = requestParameters.status
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }

      return yield* client.get("/transfer/export", Response, queryParameters)
    })

    const enableOtp = Effect.fn("Transfer.enableOtp")(function* () {
      return yield* client.post("/transfer/enable_otp", Response, undefined)
    })

    const fetch = Effect.fn("Transfer.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/transfer/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const finalize = Effect.fn("Transfer.finalize")(function* (requestParameters: FinalizeRequest) {
      const body = TransferFinalizeToJSON({
        transferCode: requestParameters.transfer_code,
        otp: requestParameters.otp,
      })

      return yield* client.post("/transfer/finalize_transfer", Response, body)
    })

    const initiate = Effect.fn("Transfer.initiate")(function* (requestParameters: InitiateRequest) {
      const body = TransferInitiateToJSON({
        source: requestParameters.source,
        amount: requestParameters.amount,
        recipient: requestParameters.recipient,
        reason: requestParameters.reason,
        currency: requestParameters.currency,
        reference: requestParameters.reference,
      })

      return yield* client.post("/transfer", Response, body)
    })

    const list = Effect.fn("Transfer.list")(function* (requestParameters: ListRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }
      if (requestParameters.status !== undefined) {
        queryParameters.status = requestParameters.status
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }

      return yield* client.get("/transfer", Response, queryParameters)
    })

    const resendOtp = Effect.fn("Transfer.resendOtp")(function* (requestParameters: ResendOtpRequest) {
      const body = TransferResendOTPToJSON({
        transferCode: requestParameters.transfer_code,
        reason: requestParameters.reason,
      })

      return yield* client.post("/transfer/resend_otp", Response, body)
    })

    const verify = Effect.fn("Transfer.verify")(function* (requestParameters: VerifyRequest) {
      return yield* client.get(`/transfer/verify/${encodeURIComponent(requestParameters.reference)}`, Response)
    })

    return Service.of({
      bulk,
      disableOtp,
      disableOtpFinalize,
      download,
      enableOtp,
      fetch,
      finalize,
      initiate,
      list,
      resendOtp,
      verify,
    })
  }),
)

export * as Transfer from "./Transfer.js"
