import { Context, Effect, Layer } from "effect"
import { DedicatedVirtualAccountCreateToJSON, DedicatedVirtualAccountSplitToJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface AddSplitRequest {
  readonly accountNumber: string
  readonly subaccount?: string
  readonly splitCode?: string
}

export interface CreateRequest {
  readonly customer: string
  readonly preferredBank?: string
  readonly subaccount?: string
  readonly splitCode?: string
}

export interface DeactivateRequest {
  readonly accountId: string
}

export interface FetchRequest {
  readonly accountId: string
}

export interface ListRequest {
  readonly accountNumber?: string
  readonly customer?: string
  readonly active?: boolean
  readonly currency?: string
  readonly providerSlug?: string
  readonly bankId?: string
  readonly perPage?: string
  readonly page?: string
}

export interface RemoveSplitRequest {
  readonly accountNumber: string
  readonly subaccount?: string
  readonly splitCode?: string
}

export interface Interface {
  readonly addSplit: (
    requestParameters: AddSplitRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly availableProviders: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly deactivate: (
    requestParameters: DeactivateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly removeSplit: (
    requestParameters: RemoveSplitRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/DedicatedVirtualAccount") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const addSplit = Effect.fn("DedicatedVirtualAccount.addSplit")(function* (requestParameters: AddSplitRequest) {
      const body = DedicatedVirtualAccountSplitToJSON({
        accountNumber: requestParameters.accountNumber,
        subaccount: requestParameters.subaccount,
        splitCode: requestParameters.splitCode,
      })

      return yield* client.post("/dedicated_account/split", Response, body)
    })

    const availableProviders = Effect.fn("DedicatedVirtualAccount.availableProviders")(function* () {
      return yield* client.get("/dedicated_account/available_providers", Response)
    })

    const create = Effect.fn("DedicatedVirtualAccount.create")(function* (requestParameters: CreateRequest) {
      const body = DedicatedVirtualAccountCreateToJSON({
        customer: requestParameters.customer,
        preferredBank: requestParameters.preferredBank,
        subaccount: requestParameters.subaccount,
        splitCode: requestParameters.splitCode,
      })

      return yield* client.post("/dedicated_account", Response, body)
    })

    const deactivate = Effect.fn("DedicatedVirtualAccount.deactivate")(function* (
      requestParameters: DeactivateRequest,
    ) {
      return yield* client.del(`/dedicated_account/${encodeURIComponent(requestParameters.accountId)}`, Response)
    })

    const fetch = Effect.fn("DedicatedVirtualAccount.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/dedicated_account/${encodeURIComponent(requestParameters.accountId)}`, Response)
    })

    const list = Effect.fn("DedicatedVirtualAccount.list")(function* (requestParameters: ListRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.accountNumber !== undefined) {
        queryParameters.account_number = requestParameters.accountNumber
      }
      if (requestParameters.customer !== undefined) {
        queryParameters.customer = requestParameters.customer
      }
      if (requestParameters.active !== undefined) {
        queryParameters.active = requestParameters.active
      }
      if (requestParameters.currency !== undefined) {
        queryParameters.currency = requestParameters.currency
      }
      if (requestParameters.providerSlug !== undefined) {
        queryParameters.provider_slug = requestParameters.providerSlug
      }
      if (requestParameters.bankId !== undefined) {
        queryParameters.bank_id = requestParameters.bankId
      }
      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }

      return yield* client.get("/dedicated_account", Response, queryParameters)
    })

    const removeSplit = Effect.fn("DedicatedVirtualAccount.removeSplit")(function* (
      requestParameters: RemoveSplitRequest,
    ) {
      const body = DedicatedVirtualAccountSplitToJSON({
        accountNumber: requestParameters.accountNumber,
        subaccount: requestParameters.subaccount,
        splitCode: requestParameters.splitCode,
      })

      return yield* client.del("/dedicated_account/split", Response, body)
    })

    return Service.of({
      addSplit,
      availableProviders,
      create,
      deactivate,
      fetch,
      list,
      removeSplit,
    })
  }),
)

export * as DedicatedVirtualAccount from "./DedicatedVirtualAccount.js"
