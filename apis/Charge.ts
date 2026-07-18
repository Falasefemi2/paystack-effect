import { Context, Effect, Layer } from "effect"
import {
  type Bank,
  BankToJSON,
  ChargeCreateToJSON,
  ChargeSubmitAddressToJSON,
  ChargeSubmitBirthdayToJSON,
  ChargeSubmitOTPToJSON,
  ChargeSubmitPhoneToJSON,
  ChargeSubmitPinToJSON,
  type EFT,
  EFTToJSON,
  type MobileMoney,
  MobileMoneyToJSON,
  Response,
  type USSD,
  USSDToJSON,
} from "../models/index.js"
import { PaystackHttpClient } from "../runtime.js"

export interface CheckRequest {
  readonly reference: string
}

export interface CreateRequest {
  readonly email?: string
  readonly amount?: string
  readonly authorization_code?: string
  readonly pin?: string
  readonly reference?: string
  readonly birthday?: Date
  readonly device_id?: string
  readonly metadata?: string
  readonly bank?: Bank
  readonly mobile_money?: MobileMoney
  readonly ussd?: USSD
  readonly eft?: EFT
}

export interface SubmitAddressRequest {
  readonly address: string
  readonly city: string
  readonly state: string
  readonly zipcode: string
  readonly reference: string
}

export interface SubmitBirthdayRequest {
  readonly birthday: string
  readonly reference: string
}

export interface SubmitOtpRequest {
  readonly otp: string
  readonly reference: string
}

export interface SubmitPhoneRequest {
  readonly phone: string
  readonly reference: string
}

export interface SubmitPinRequest {
  readonly pin: string
  readonly reference: string
}

export interface Interface {
  readonly check: (
    requestParameters: CheckRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly create: (
    requestParameters: CreateRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly submitAddress: (
    requestParameters: SubmitAddressRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly submitBirthday: (
    requestParameters: SubmitBirthdayRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly submitOtp: (
    requestParameters: SubmitOtpRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly submitPhone: (
    requestParameters: SubmitPhoneRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>

  readonly submitPin: (
    requestParameters: SubmitPinRequest,
  ) => Effect.Effect<Response, PaystackHttpClient.PaystackApiError | PaystackHttpClient.PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/apis/Charge") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* PaystackHttpClient.Service

    const check = Effect.fn("Charge.check")(function* (requestParameters: CheckRequest) {
      return yield* client.get(`/charge/${encodeURIComponent(requestParameters.reference)}`, Response)
    })

    const create = Effect.fn("Charge.create")(function* (requestParameters: CreateRequest) {
      const body = {
        ...(ChargeCreateToJSON({
          email: requestParameters.email ?? "",
          amount: requestParameters.amount ?? "",
          authorizationCode: requestParameters.authorization_code,
          pin: requestParameters.pin,
          reference: requestParameters.reference,
          birthday: requestParameters.birthday,
          deviceId: requestParameters.device_id,
          metadata: requestParameters.metadata,
        }) as Record<string, unknown>),
        ...(requestParameters.bank !== undefined && {
          bank: BankToJSON(requestParameters.bank),
        }),
        ...(requestParameters.mobile_money !== undefined && {
          mobile_money: MobileMoneyToJSON(requestParameters.mobile_money),
        }),
        ...(requestParameters.ussd !== undefined && {
          ussd: USSDToJSON(requestParameters.ussd),
        }),
        ...(requestParameters.eft !== undefined && {
          eft: EFTToJSON(requestParameters.eft),
        }),
      }

      return yield* client.post("/charge", Response, body)
    })

    const submitAddress = Effect.fn("Charge.submitAddress")(function* (requestParameters: SubmitAddressRequest) {
      const body = ChargeSubmitAddressToJSON({
        address: requestParameters.address,
        city: requestParameters.city,
        state: requestParameters.state,
        zipcode: requestParameters.zipcode,
        reference: requestParameters.reference,
      })

      return yield* client.post("/charge/submit_address", Response, body)
    })

    const submitBirthday = Effect.fn("Charge.submitBirthday")(function* (requestParameters: SubmitBirthdayRequest) {
      const body = ChargeSubmitBirthdayToJSON({
        birthday: requestParameters.birthday,
        reference: requestParameters.reference,
      })

      return yield* client.post("/charge/submit_birthday", Response, body)
    })

    const submitOtp = Effect.fn("Charge.submitOtp")(function* (requestParameters: SubmitOtpRequest) {
      const body = ChargeSubmitOTPToJSON({
        otp: requestParameters.otp,
        reference: requestParameters.reference,
      })

      return yield* client.post("/charge/submit_otp", Response, body)
    })

    const submitPhone = Effect.fn("Charge.submitPhone")(function* (requestParameters: SubmitPhoneRequest) {
      const body = ChargeSubmitPhoneToJSON({
        phone: requestParameters.phone,
        reference: requestParameters.reference,
      })

      return yield* client.post("/charge/submit_phone", Response, body)
    })

    const submitPin = Effect.fn("Charge.submitPin")(function* (requestParameters: SubmitPinRequest) {
      const body = ChargeSubmitPinToJSON({
        pin: requestParameters.pin,
        reference: requestParameters.reference,
      })

      return yield* client.post("/charge/submit_pin", Response, body)
    })

    return Service.of({
      check,
      create,
      submitAddress,
      submitBirthday,
      submitOtp,
      submitPhone,
      submitPin,
    })
  }),
)

export * as Charge from "./Charge.js"
