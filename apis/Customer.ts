import { Context, Effect, Layer } from "effect"
import {
  CustomerCreateToJSON,
  CustomerDeactivateAuthorizationToJSON,
  CustomerRiskActionToJSON,
  CustomerUpdateToJSON,
  CustomerValidationToJSON,
  Response,
} from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CreateRequest {
  readonly email: string
  readonly firstName?: string
  readonly lastName?: string
  readonly phone?: string
  readonly metadata?: string
}

export interface DeactivateAuthorizationRequest {
  readonly authorizationCode: string
}

export interface FetchRequest {
  readonly code: string
}

export interface ListRequest {
  readonly useCursor?: boolean
  readonly next?: string
  readonly previous?: string
  readonly from?: string
  readonly to?: string
  readonly perPage?: string
  readonly page?: string
}

export interface RiskActionRequest {
  readonly customer: string
  readonly riskAction?: string
}

export interface UpdateRequest {
  readonly code: string
  readonly firstName?: string
  readonly lastName?: string
  readonly phone?: string
  readonly metadata?: string
}

export interface ValidateRequest {
  readonly code: string
  readonly firstName: string
  readonly lastName: string
  readonly type: string
  readonly country: string
  readonly bvn: string
  readonly bankCode: string
  readonly accountNumber: string
  readonly value?: string
}

export interface Interface {
  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly deactivateAuthorization: (
    requestParameters: DeactivateAuthorizationRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly fetch: (
    requestParameters: FetchRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly list: (
    requestParameters: ListRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly riskAction: (
    requestParameters: RiskActionRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly update: (
    requestParameters: UpdateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly validate: (
    requestParameters: ValidateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Customer") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const create = Effect.fn("Customer.create")(function* (requestParameters: CreateRequest) {
      const body = CustomerCreateToJSON({
        email: requestParameters.email,
        firstName: requestParameters.firstName,
        lastName: requestParameters.lastName,
        phone: requestParameters.phone,
        metadata: requestParameters.metadata,
      })

      return yield* client.post("/customer", Response, body)
    })

    const deactivateAuthorization = Effect.fn("Customer.deactivateAuthorization")(function* (
      requestParameters: DeactivateAuthorizationRequest,
    ) {
      const body = CustomerDeactivateAuthorizationToJSON({
        authorizationCode: requestParameters.authorizationCode,
      })

      return yield* client.post("/authorization/deactivate", Response, body)
    })

    const fetch = Effect.fn("Customer.fetch")(function* (requestParameters: FetchRequest) {
      return yield* client.get(`/customer/${encodeURIComponent(requestParameters.code)}`, Response)
    })

    const list = Effect.fn("Customer.list")(function* (requestParameters: ListRequest) {
      const queryParameters: Record<string, string | number | boolean> = {}

      if (requestParameters.useCursor !== undefined) {
        queryParameters.use_cursor = requestParameters.useCursor
      }
      if (requestParameters.next !== undefined) {
        queryParameters.next = requestParameters.next
      }
      if (requestParameters.previous !== undefined) {
        queryParameters.previous = requestParameters.previous
      }
      if (requestParameters.from !== undefined) {
        queryParameters.from = requestParameters.from
      }
      if (requestParameters.to !== undefined) {
        queryParameters.to = requestParameters.to
      }
      if (requestParameters.perPage !== undefined) {
        queryParameters.perPage = requestParameters.perPage
      }
      if (requestParameters.page !== undefined) {
        queryParameters.page = requestParameters.page
      }

      return yield* client.get("/customer", Response, queryParameters)
    })

    const riskAction = Effect.fn("Customer.riskAction")(function* (requestParameters: RiskActionRequest) {
      const body = CustomerRiskActionToJSON({
        reference: requestParameters.customer,
        riskAction: requestParameters.riskAction ?? "",
      })

      return yield* client.post("/customer/risk_action", Response, body)
    })

    const update = Effect.fn("Customer.update")(function* (requestParameters: UpdateRequest) {
      const body = CustomerUpdateToJSON({
        firstName: requestParameters.firstName,
        lastName: requestParameters.lastName,
        phone: requestParameters.phone,
        metadata: requestParameters.metadata,
      })

      return yield* client.put(`/customer/${encodeURIComponent(requestParameters.code)}`, Response, body)
    })

    const validate = Effect.fn("Customer.validate")(function* (requestParameters: ValidateRequest) {
      const validationJSON = CustomerValidationToJSON({
        firstName: requestParameters.firstName,
        lastName: requestParameters.lastName,
        type: requestParameters.type,
        country: requestParameters.country,
        bvn: requestParameters.bvn,
        bankCode: requestParameters.bankCode,
        accountNumber: requestParameters.accountNumber,
        value: requestParameters.value,
      })

      const body = {
        ...(validationJSON as Record<string, unknown>),
        code: requestParameters.code,
      }

      return yield* client.post("/customer/validate", Response, body)
    })

    return Service.of({
      create,
      deactivateAuthorization,
      fetch,
      list,
      riskAction,
      update,
      validate,
    })
  }),
)

export * as Customer from "./Customer.js"
