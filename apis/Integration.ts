import { Context, Effect, Layer } from "effect"
import { Response } from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface UpdatePaymentSessionTimeoutRequest {
  readonly body?: Record<string, unknown>
}

export interface Interface {
  readonly fetchPaymentSessionTimeout: () => Effect.Effect<
    Response,
    PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError
  >

  readonly updatePaymentSessionTimeout: (
    requestParameters: UpdatePaymentSessionTimeoutRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Integration") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const fetchPaymentSessionTimeout = Effect.fn("Integration.fetchPaymentSessionTimeout")(function* () {
      return yield* client.get("/integration/payment_session_timeout", Response)
    })

    const updatePaymentSessionTimeout = Effect.fn("Integration.updatePaymentSessionTimeout")(function* (
      requestParameters: UpdatePaymentSessionTimeoutRequest,
    ) {
      return yield* client.put("/integration/payment_session_timeout", Response, requestParameters.body)
    })

    return Service.of({
      fetchPaymentSessionTimeout,
      updatePaymentSessionTimeout,
    })
  }),
)

export * as Integration from "./Integration.js"
