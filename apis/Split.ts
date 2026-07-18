import { Context, Effect, Layer } from "effect"
import { Response, SplitCreateFromJSON, type SplitSubaccounts, SplitUpdateFromJSON } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface AddSubaccountRequest {
  readonly id: string
  readonly subaccount?: string
  readonly share?: string
}

export interface CreateRequest {
  readonly name: string
  readonly type: string
  readonly subaccounts: Array<SplitSubaccounts>
  readonly currency: string
  readonly bearer_type?: string
  readonly bearer_subaccount?: string
}

export interface FetchRequest {
  readonly id: string
}

export interface ListRequest {
  readonly name?: string
  readonly active?: string
  readonly sort_by?: string
  readonly from?: string
  readonly to?: string
  readonly perPage?: string
  readonly page?: string
}

export interface RemoveSubaccountRequest {
  readonly id: string
  readonly subaccount?: string
  readonly share?: string
}

export interface UpdateRequest {
  readonly id: string
  readonly name?: string
  readonly active?: boolean
  readonly bearer_type?: string
  readonly bearer_subaccount?: string
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type SplitEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly addSubaccount: (requestParameters: AddSubaccountRequest) => SplitEffect

  readonly create: (requestParameters: CreateRequest) => SplitEffect

  readonly fetch: (requestParameters: FetchRequest) => SplitEffect

  readonly list: (requestParameters: ListRequest) => SplitEffect

  readonly removeSubaccount: (requestParameters: RemoveSubaccountRequest) => SplitEffect

  readonly update: (requestParameters: UpdateRequest) => SplitEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Split/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const addSubaccount = Effect.fn("Split.addSubaccount")(function* (requestParameters: AddSubaccountRequest) {
      const body = {
        ...(requestParameters.subaccount !== undefined && {
          subaccount: requestParameters.subaccount,
        }),

        ...(requestParameters.share !== undefined && {
          share: requestParameters.share,
        }),
      }

      return yield* client.post(`/split/${encodeURIComponent(requestParameters.id)}/subaccount/add`, Response, body)
    })

    const create = Effect.fn("Split.create")(function* (requestParameters: CreateRequest) {
      const body = SplitCreateFromJSON({
        name: requestParameters.name,
        type: requestParameters.type,
        subaccounts: requestParameters.subaccounts,
        currency: requestParameters.currency,
        bearerType: requestParameters.bearer_type,
        bearerSubaccount: requestParameters.bearer_subaccount,
      })

      return yield* client.post("/split", Response, body)
    })

    const fetch = Effect.fn("Split.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/split/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const list = Effect.fn("Split.list")(function* (requestParameters: ListRequest) {
      const queryParameters = {
        ...(requestParameters.name !== undefined && {
          name: requestParameters.name,
        }),

        ...(requestParameters.active !== undefined && {
          active: requestParameters.active,
        }),

        ...(requestParameters.sort_by !== undefined && {
          sort_by: requestParameters.sort_by,
        }),

        ...(requestParameters.from !== undefined && {
          from: requestParameters.from,
        }),

        ...(requestParameters.to !== undefined && {
          to: requestParameters.to,
        }),

        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),
      }

      return yield* client.get("/split", Response, queryParameters)
    })

    const removeSubaccount = Effect.fn("Split.removeSubaccount")(function* (
      requestParameters: RemoveSubaccountRequest,
    ) {
      const body = {
        ...(requestParameters.subaccount !== undefined && {
          subaccount: requestParameters.subaccount,
        }),

        ...(requestParameters.share !== undefined && {
          share: requestParameters.share,
        }),
      }

      return yield* client.post(`/split/${encodeURIComponent(requestParameters.id)}/subaccount/remove`, Response, body)
    })

    const update = Effect.fn("Split.update")(function* (requestParameters: UpdateRequest) {
      const body = SplitUpdateFromJSON({
        name: requestParameters.name,
        active: requestParameters.active,
        bearerType: requestParameters.bearer_type,
        bearerSubaccount: requestParameters.bearer_subaccount,
      })

      return yield* client.put(`/split/${encodeURIComponent(requestParameters.id)}`, Response, body)
    })

    return Service.of({
      addSubaccount,
      create,
      fetch,
      list,
      removeSubaccount,
      update,
    })
  }),
)
