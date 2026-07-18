import { Context, Effect, Layer } from "effect"
import {
  Response,
  TransferRecipientBulkToJSON,
  type TransferRecipientCreate,
  TransferRecipientCreateToJSON,
  TransferRecipientUpdateToJSON,
} from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface BulkRequest {
  readonly batch: Array<TransferRecipientCreate>
}

export interface CreateRequest {
  readonly type: string
  readonly name: string
  readonly account_number: string
  readonly bank_code: string
  readonly description?: string
  readonly currency?: string
  readonly authorization_code?: string
  readonly metadata?: string
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

export interface TransferrecipientCodeDeleteRequest {
  readonly code: string
}

export interface TransferrecipientCodePutRequest {
  readonly code: string
  readonly name?: string
  readonly email?: string
}

export interface Interface {
  readonly bulk: (
    requestParameters: BulkRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly transferrecipientCodeDelete: (
    requestParameters: TransferrecipientCodeDeleteRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly transferrecipientCodePut: (
    requestParameters: TransferrecipientCodePutRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/TransferRecipient") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const bulk = Effect.fn("TransferRecipient.bulk")(function* (requestParameters: BulkRequest) {
      const body = TransferRecipientBulkToJSON({
        batch: requestParameters.batch,
      })

      return yield* client.post("/transferrecipient/bulk", Response, body)
    })

    const create = Effect.fn("TransferRecipient.create")(function* (requestParameters: CreateRequest) {
      const body = TransferRecipientCreateToJSON({
        type: requestParameters.type,
        name: requestParameters.name,
        accountNumber: requestParameters.account_number,
        bankCode: requestParameters.bank_code,
        description: requestParameters.description,
        currency: requestParameters.currency,
        authorizationCode: requestParameters.authorization_code,
        metadata: requestParameters.metadata,
      })

      return yield* client.post("/transferrecipient", Response, body)
    })

    const fetch = Effect.fn("TransferRecipient.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/transferrecipient/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const list = Effect.fn("TransferRecipient.list")(function* (requestParameters: ListRequest) {
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

      return yield* client.get("/transferrecipient", Response, queryParameters)
    })

    const transferrecipientCodeDelete = Effect.fn("TransferRecipient.transferrecipientCodeDelete")(function* (
      requestParameters: TransferrecipientCodeDeleteRequest,
    ) {
      return yield* client.del(`/transferrecipient/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const transferrecipientCodePut = Effect.fn("TransferRecipient.transferrecipientCodePut")(function* (
      requestParameters: TransferrecipientCodePutRequest,
    ) {
      const body = TransferRecipientUpdateToJSON({
        name: requestParameters.name,
        email: requestParameters.email,
      })

      return yield* client.put(`/transferrecipient/${encodeURIComponent(requestParameters.code)}`, Response, body)
    })

    return Service.of({
      bulk,
      create,
      fetch,
      list,
      transferrecipientCodeDelete,
      transferrecipientCodePut,
    })
  }),
)

export * as TransferRecipient from "./TransferRecipient.js"
