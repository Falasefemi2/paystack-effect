import { Context, Effect, Layer } from "effect"
import { Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface AvsRequest {
  readonly type?: string
  readonly country?: string
  readonly currency?: string
}

export interface FetchBanksRequest {
  readonly country?: string
  readonly pay_with_bank_transfer?: boolean
  readonly use_cursor?: boolean
  readonly perPage?: number
  readonly next?: string
  readonly previous?: string
  readonly gateway?: string
}

export interface ResolveAccountNumberRequest {
  readonly account_number?: number
  readonly bank_code?: number
}

export interface ResolveCardBinRequest {
  readonly bin: string
}

export interface Interface {
  readonly avs: (
    requestParameters: AvsRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetchBanks: (
    requestParameters: FetchBanksRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly listCountries: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly resolveAccountNumber: (
    requestParameters: ResolveAccountNumberRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly resolveCardBin: (
    requestParameters: ResolveCardBinRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Verification") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const avs = Effect.fn("Verification.avs")(function* (requestParameters: AvsRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.type !== undefined) {
        queryParameters.type = requestParameters.type
      }
      if (requestParameters.country !== undefined) {
        queryParameters.country = requestParameters.country
      }
      if (requestParameters.currency !== undefined) {
        queryParameters.currency = requestParameters.currency
      }

      return yield* client.get("/address_verification/states", Response, queryParameters)
    })

    const fetchBanks = Effect.fn("Verification.fetchBanks")(function* (requestParameters: FetchBanksRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.country !== undefined) {
        queryParameters.country = requestParameters.country
      }
      if (requestParameters.pay_with_bank_transfer !== undefined) {
        queryParameters.pay_with_bank_transfer = requestParameters.pay_with_bank_transfer
      }
      if (requestParameters.use_cursor !== undefined) {
        queryParameters.use_cursor = requestParameters.use_cursor
      }
      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.next !== undefined) {
        queryParameters.next = requestParameters.next
      }
      if (requestParameters.previous !== undefined) {
        queryParameters.previous = requestParameters.previous
      }
      if (requestParameters.gateway !== undefined) {
        queryParameters.gateway = requestParameters.gateway
      }

      return yield* client.get("/bank", Response, queryParameters)
    })

    const listCountries = Effect.fn("Verification.listCountries")(function* () {
      return yield* client.get("/country", Response)
    })

    const resolveAccountNumber = Effect.fn("Verification.resolveAccountNumber")(function* (
      requestParameters: ResolveAccountNumberRequest,
    ) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.account_number !== undefined) {
        queryParameters.account_number = requestParameters.account_number
      }
      if (requestParameters.bank_code !== undefined) {
        queryParameters.bank_code = requestParameters.bank_code
      }

      return yield* client.get("/bank/resolve", Response, queryParameters)
    })

    const resolveCardBin = Effect.fn("Verification.resolveCardBin")(function* (
      requestParameters: ResolveCardBinRequest,
    ) {
      return yield* client.get(`/decision/bin/${encodeURIComponent(requestParameters.bin)}`, Response)
    })

    return Service.of({
      avs,
      fetchBanks,
      listCountries,
      resolveAccountNumber,
      resolveCardBin,
    })
  }),
)

export * as Verification from "./Verification.js"
