import { Context, Effect, Layer } from "effect"
import { PageCreateToJSON, PageUpdateToJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface AddProductsRequest {
  readonly id: string
  readonly product: ReadonlyArray<string>
}

export interface CheckSlugAvailabilityRequest {
  readonly slug: string
}

export interface CreateRequest {
  readonly name: string
  readonly description?: string
  readonly amount?: number
  readonly slug?: string
  readonly metadata?: string
  readonly redirectUrl?: string
  readonly customFields?: ReadonlyArray<Record<string, unknown>>
}

export interface FetchRequest {
  readonly id: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly from?: Date
  readonly to?: Date
}

export interface UpdateRequest {
  readonly id: string
  readonly name?: string
  readonly description?: string
  readonly amount?: number
  readonly active?: boolean
}

export interface Interface {
  readonly addProducts: (
    requestParameters: AddProductsRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly checkSlugAvailability: (
    requestParameters: CheckSlugAvailabilityRequest,
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

  readonly update: (
    requestParameters: UpdateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Page") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const addProducts = Effect.fn("Page.addProducts")(function* (requestParameters: AddProductsRequest) {
      return yield* client.post(`/page/${encodeURIComponent(requestParameters.id)}/product`, Response, {
        product: requestParameters.product,
      })
    })

    const checkSlugAvailability = Effect.fn("Page.checkSlugAvailability")(function* (
      requestParameters: CheckSlugAvailabilityRequest,
    ) {
      return yield* client.get(`/page/check_slug_availability/${encodeURIComponent(requestParameters.slug)}`, Response)
    })

    const create = Effect.fn("Page.create")(function* (requestParameters: CreateRequest) {
      const body = PageCreateToJSON({
        name: requestParameters.name,
        description: requestParameters.description,
        amount: requestParameters.amount,
        slug: requestParameters.slug,
        metadata: requestParameters.metadata,
        redirectUrl: requestParameters.redirectUrl,
        customFields: requestParameters.customFields,
      })

      return yield* client.post("/page", Response, body)
    })

    const fetch = Effect.fn("Page.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/page/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const list = Effect.fn("Page.list")(function* (requestParameters: ListRequest) {
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

      return yield* client.get("/page", Response, queryParameters)
    })

    const update = Effect.fn("Page.update")(function* (requestParameters: UpdateRequest) {
      const body = PageUpdateToJSON({
        name: requestParameters.name,
        description: requestParameters.description,
        amount: requestParameters.amount,
        active: requestParameters.active,
      })

      return yield* client.put(`/page/${encodeURIComponent(requestParameters.id)}`, Response, body)
    })

    return Service.of({
      addProducts,
      checkSlugAvailability,
      create,
      fetch,
      list,
      update,
    })
  }),
)

export * as Page from "./Page.js"
