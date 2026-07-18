import { Context, Effect, Layer } from "effect"
import { DisputeEvidenceToJSON, DisputeResolveToJSON, DisputeUpdateToJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface DownloadRequest {
  readonly perPage?: number
  readonly page?: number
  readonly status?: string
  readonly from?: Date
  readonly to?: Date
}

export interface EvidenceRequest {
  readonly id: string
  readonly customerEmail: string
  readonly customerName: string
  readonly customerPhone: string
  readonly serviceDetails: string
  readonly deliveryAddress?: string
  readonly deliveryDate?: Date
}

export interface FetchRequest {
  readonly id: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly status?: string
  readonly transaction?: string
  readonly from?: Date
  readonly to?: Date
}

export interface ResolveRequest {
  readonly id: string
  readonly resolution: string
  readonly message: string
  readonly refundAmount: string
  readonly uploadedFilename: string
  readonly evidence?: number
}

export interface TransactionRequest {
  readonly id: string
}

export interface UpdateRequest {
  readonly id: string
  readonly refundAmount: string
  readonly uploadedFilename?: string
}

export interface UploadUrlRequest {
  readonly id: string
}

export interface Interface {
  readonly download: (
    requestParameters: DownloadRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly evidence: (
    requestParameters: EvidenceRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly resolve: (
    requestParameters: ResolveRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly transaction: (
    requestParameters: TransactionRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly update: (
    requestParameters: UpdateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly uploadUrl: (
    requestParameters: UploadUrlRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Dispute") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const download = Effect.fn("Dispute.download")(function* (requestParameters: DownloadRequest) {
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

      return yield* client.get("/dispute/export", Response, queryParameters)
    })

    const evidence = Effect.fn("Dispute.evidence")(function* (requestParameters: EvidenceRequest) {
      const body = DisputeEvidenceToJSON({
        customerEmail: requestParameters.customerEmail,
        customerName: requestParameters.customerName,
        customerPhone: requestParameters.customerPhone,
        serviceDetails: requestParameters.serviceDetails,
        deliveryAddress: requestParameters.deliveryAddress,
        deliveryDate: requestParameters.deliveryDate ? requestParameters.deliveryDate.toISOString() : undefined,
      })

      return yield* client.post(`/dispute/${encodeURIComponent(requestParameters.id)}/evidence`, Response, body)
    })

    const fetch = Effect.fn("Dispute.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/dispute/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const list = Effect.fn("Dispute.list")(function* (requestParameters: ListRequest) {
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
      if (requestParameters.transaction !== undefined) {
        queryParameters.transaction = requestParameters.transaction
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from.toISOString()
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to.toISOString()
      }

      return yield* client.get("/dispute", Response, queryParameters)
    })

    const resolve = Effect.fn("Dispute.resolve")(function* (requestParameters: ResolveRequest) {
      const body = DisputeResolveToJSON({
        resolution: requestParameters.resolution,
        message: requestParameters.message,
        refundAmount: requestParameters.refundAmount,
        uploadedFilename: requestParameters.uploadedFilename,
        evidence: requestParameters.evidence !== undefined ? String(requestParameters.evidence) : undefined,
      })

      return yield* client.put(`/dispute/${encodeURIComponent(requestParameters.id)}/resolve`, Response, body)
    })

    const transaction = Effect.fn("Dispute.transaction")(function* (requestParameters: TransactionRequest) {
      return yield* client.get(`/dispute/transaction/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const update = Effect.fn("Dispute.update")(function* (requestParameters: UpdateRequest) {
      const body = DisputeUpdateToJSON({
        refundAmount: requestParameters.refundAmount,
        uploadedFilename: requestParameters.uploadedFilename,
      })

      return yield* client.put(`/dispute/${encodeURIComponent(requestParameters.id)}`, Response, body)
    })

    const uploadUrl = Effect.fn("Dispute.uploadUrl")(function* (requestParameters: UploadUrlRequest) {
      return yield* client.get(`/dispute/${encodeURIComponent(requestParameters.id)}/upload_url`, Response)
    })

    return Service.of({
      download,
      evidence,
      fetch,
      list,
      resolve,
      transaction,
      update,
      uploadUrl,
    })
  }),
)

export * as Dispute from "./Dispute.js"
