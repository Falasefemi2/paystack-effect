import { Context, Effect, Layer } from "effect"
import { ProductCreateFromJSON, ProductUpdateFromJSON, Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface DeleteRequest {
  readonly id: string
}

export interface CreateRequest {
  readonly name: string
  readonly description: string
  readonly price: number
  readonly currency: string
  readonly limited?: boolean
  readonly quantity?: number
}

export interface FetchRequest {
  readonly id: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly active?: boolean
  readonly from?: Date
  readonly to?: Date
}

export interface UpdateRequest {
  readonly id: string
  readonly name?: string
  readonly description?: string
  readonly price?: number
  readonly currency?: string
  readonly limited?: boolean
  readonly quantity?: number
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type ProductEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly delete: (requestParameters: DeleteRequest) => ProductEffect

  readonly create: (requestParameters: CreateRequest) => ProductEffect

  readonly fetch: (requestParameters: FetchRequest) => ProductEffect

  readonly list: (requestParameters: ListRequest) => ProductEffect

  readonly update: (requestParameters: UpdateRequest) => ProductEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Product/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const deleteProduct = Effect.fn("Product.delete")(function* (requestParameters: DeleteRequest) {
      return yield* client.del(`/product/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const create = Effect.fn("Product.create")(function* (requestParameters: CreateRequest) {
      const body = ProductCreateFromJSON({
        name: requestParameters.name,
        description: requestParameters.description,
        price: requestParameters.price,
        currency: requestParameters.currency,
        limited: requestParameters.limited,
        quantity: requestParameters.quantity,
      })

      return yield* client.post("/product", Response, body)
    })

    const fetch = Effect.fn("Product.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/product/${encodeURIComponent(requestParameters.id)}`, Response)
    })

    const list = Effect.fn("Product.list")(function* (requestParameters: ListRequest) {
      const queryParameters = {
        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),

        ...(requestParameters.active !== undefined && {
          active: requestParameters.active,
        }),

        ...(requestParameters.from !== undefined && {
          from: requestParameters.from.toISOString(),
        }),

        ...(requestParameters.to !== undefined && {
          to: requestParameters.to.toISOString(),
        }),
      }

      return yield* client.get("/product", Response, queryParameters)
    })

    const update = Effect.fn("Product.update")(function* (requestParameters: UpdateRequest) {
      const body = ProductUpdateFromJSON({
        name: requestParameters.name,
        description: requestParameters.description,
        price: requestParameters.price,
        currency: requestParameters.currency,
        limited: requestParameters.limited,
        quantity: requestParameters.quantity,
      })

      return yield* client.put(`/product/${encodeURIComponent(requestParameters.id)}`, Response, body)
    })

    return Service.of({
      delete: deleteProduct,
      create,
      fetch,
      list,
      update,
    })
  }),
)
