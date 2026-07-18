import { Context, Effect, Layer } from "effect"
import { Response, SubaccountCreateFromJSON, SubaccountUpdateFromJSON } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CreateRequest {
  readonly business_name: string
  readonly settlement_bank: string
  readonly account_number: string
  readonly percentage_charge: number
  readonly description?: string
  readonly primary_contact_email?: string
  readonly primary_contact_name?: string
  readonly primary_contact_phone?: string
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

export interface UpdateRequest {
  readonly code: string
  readonly business_name?: string
  readonly settlement_bank?: string
  readonly account_number?: string
  readonly active?: boolean
  readonly percentage_charge?: number
  readonly description?: string
  readonly primary_contact_email?: string
  readonly primary_contact_name?: string
  readonly primary_contact_phone?: string
  readonly metadata?: string
}

type PaystackError = PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError

type SubaccountEffect<A = Response> = Effect.Effect<A, PaystackError>

export interface Interface {
  readonly create: (requestParameters: CreateRequest) => SubaccountEffect

  readonly fetch: (requestParameters: FetchRequest) => SubaccountEffect

  readonly list: (requestParameters: ListRequest) => SubaccountEffect

  readonly update: (requestParameters: UpdateRequest) => SubaccountEffect
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Subaccount/Service") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const create = Effect.fn("Subaccount.create")(function* (requestParameters: CreateRequest) {
      const body = SubaccountCreateFromJSON({
        businessName: requestParameters.business_name,
        settlementBank: requestParameters.settlement_bank,
        accountNumber: requestParameters.account_number,
        percentageCharge: requestParameters.percentage_charge,
        description: requestParameters.description,
        primaryContactEmail: requestParameters.primary_contact_email,
        primaryContactName: requestParameters.primary_contact_name,
        primaryContactPhone: requestParameters.primary_contact_phone,
        metadata: requestParameters.metadata,
      })

      return yield* client.post("/subaccount", Response, body)
    })

    const fetch = Effect.fn("Subaccount.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/subaccount/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const list = Effect.fn("Subaccount.list")(function* (requestParameters: ListRequest) {
      const queryParameters = {
        ...(requestParameters.perPage !== undefined && {
          perPage: requestParameters.perPage,
        }),

        ...(requestParameters.page !== undefined && {
          page: requestParameters.page,
        }),

        ...(requestParameters.from !== undefined && {
          from: requestParameters.from.toISOString(),
        }),

        ...(requestParameters.to !== undefined && {
          to: requestParameters.to.toISOString(),
        }),
      }

      return yield* client.get("/subaccount", Response, queryParameters)
    })

    const update = Effect.fn("Subaccount.update")(function* (requestParameters: UpdateRequest) {
      const body = SubaccountUpdateFromJSON({
        businessName: requestParameters.business_name,
        settlementBank: requestParameters.settlement_bank,
        accountNumber: requestParameters.account_number,
        active: requestParameters.active,
        percentageCharge: requestParameters.percentage_charge,
        description: requestParameters.description,
        primaryContactEmail: requestParameters.primary_contact_email,
        primaryContactName: requestParameters.primary_contact_name,
        primaryContactPhone: requestParameters.primary_contact_phone,
        metadata: requestParameters.metadata,
      })

      return yield* client.put(`/subaccount/${encodeURIComponent(requestParameters.code)}`, Response, body)
    })

    return Service.of({
      create,
      fetch,
      list,
      update,
    })
  }),
)
