import { Context, Effect, Layer } from "effect"
import { Response, SubscriptionCreateFromJSON } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CreateRequest {
  readonly customer: string
  readonly plan: string
  readonly authorization?: string
  readonly start_date?: Date
}

export interface DisableRequest {
  readonly code: string
  readonly token: string
}

export interface EnableRequest {
  readonly code: string
  readonly token: string
}

export interface FetchRequest {
  readonly code: string
}

export interface ListRequest {
  readonly perPage?: number
  readonly page?: number
  readonly plan?: string
  readonly customer?: string
  readonly from?: Date
  readonly to?: Date
}

export interface ManageEmailRequest {
  readonly code: string
}

export interface ManageLinkRequest {
  readonly code: string
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type SubscriptionEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly create: (requestParameters: CreateRequest) => SubscriptionEffect

  readonly disable: (requestParameters: DisableRequest) => SubscriptionEffect

  readonly enable: (requestParameters: EnableRequest) => SubscriptionEffect

  readonly fetch: (requestParameters: FetchRequest) => SubscriptionEffect

  readonly list: (requestParameters: ListRequest) => SubscriptionEffect

  readonly manageEmail: (requestParameters: ManageEmailRequest) => SubscriptionEffect

  readonly manageLink: (requestParameters: ManageLinkRequest) => SubscriptionEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Subscription/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const create = Effect.fn("Subscription.create")(function* (requestParameters: CreateRequest) {
      const body = SubscriptionCreateFromJSON({
        customer: requestParameters.customer,
        plan: requestParameters.plan,
        authorization: requestParameters.authorization,
        startDate: requestParameters.start_date?.toISOString(),
      })

      return yield* client.post("/subscription", Response, body)
    })

    const disable = Effect.fn("Subscription.disable")(function* (requestParameters: DisableRequest) {
      const body = {
        code: requestParameters.code,
        token: requestParameters.token,
      }

      return yield* client.post("/subscription/disable", Response, body)
    })

    const enable = Effect.fn("Subscription.enable")(function* (requestParameters: EnableRequest) {
      const body = {
        code: requestParameters.code,
        token: requestParameters.token,
      }

      return yield* client.post("/subscription/enable", Response, body)
    })

    const fetch = Effect.fn("Subscription.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/subscription/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const list = Effect.fn("Subscription.list")(function* (requestParameters: ListRequest) {
      const queryParameters = {
        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),

        ...(requestParameters.plan !== undefined && {
          plan: requestParameters.plan,
        }),

        ...(requestParameters.customer !== undefined && {
          customer: requestParameters.customer,
        }),

        ...(requestParameters.from !== undefined && {
          from: requestParameters.from.toISOString(),
        }),

        ...(requestParameters.to !== undefined && {
          to: requestParameters.to.toISOString(),
        }),
      }

      return yield* client.get("/subscription", Response, queryParameters)
    })

    const manageEmail = Effect.fn("Subscription.manageEmail")(function* (requestParameters: ManageEmailRequest) {
      const queryParameters: any = {}
      return yield* client.post(
        `/subscription/${encodeURIComponent(requestParameters.code)}/manage/email`,
        Response,
        queryParameters,
      )
    })

    const manageLink = Effect.fn("Subscription.manageLink")(function* (requestParameters: ManageLinkRequest) {
      return yield* client.get(`/subscription/${encodeURIComponent(requestParameters.code)}/manage/link`, Response)
    })

    return Service.of({
      create,
      disable,
      enable,
      fetch,
      list,
      manageEmail,
      manageLink,
    })
  }),
)
