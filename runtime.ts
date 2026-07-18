import { Config, Context, Effect, Layer, Redacted, Schema } from "effect"
import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http"

const BASE_URL = "https://api.paystack.co"
const USER_AGENT = "@paystack/paystack-sdk - 2.0.0"

export class PaystackApiError extends Schema.TaggedErrorClass<PaystackApiError>()("PaystackApiError", {
  status: Schema.Number,
  requestUrl: Schema.String,
  message: Schema.String,
  body: Schema.Unknown,
}) {}

export class PaystackRequestError extends Schema.TaggedErrorClass<PaystackRequestError>()("PaystackRequestError", {
  message: Schema.String,
  cause: Schema.Defect(),
}) {}

export class PaystackConfig extends Context.Service<
  PaystackConfig,
  {
    readonly apiKey: Redacted.Redacted<string>
  }
>()("paystack-effect/runtime/PaystackConfig") {}

export const layerConfig = (
  config: Config.Wrap<{ readonly apiKey: Redacted.Redacted<string> }>,
): Layer.Layer<PaystackConfig, Config.ConfigError> =>
  Layer.effect(PaystackConfig, Config.unwrap(config).pipe(Effect.map((c) => PaystackConfig.of(c))))

export const layerConfigFromEnv: Layer.Layer<PaystackConfig, Config.ConfigError> = layerConfig({
  apiKey: Config.redacted("PAYSTACK_SECRET_KEY"),
})

type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ReadonlyArray<QueryValue>
  | { readonly [key: string]: QueryValue }

const encodeQuery = (query: Record<string, QueryValue> | undefined): string => {
  if (!query) return ""
  const params = new URLSearchParams()

  const walk = (key: string, value: QueryValue): void => {
    if (value === null || value === undefined) return
    if (Array.isArray(value)) {
      value.forEach((v) => {
        walk(`${key}[]`, v)
      })
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => {
        walk(`${key}[${k}]`, v)
      })
    } else {
      params.append(key, String(value))
    }
  }

  Object.entries(query).forEach(([k, v]) => {
    walk(k, v)
  })
  return params.toString()
}

export interface Interface {
  readonly get: <A>(
    path: string,
    schema: Schema.Decoder<A>,
    query?: Record<string, QueryValue>,
  ) => Effect.Effect<A, PaystackApiError | PaystackRequestError>

  readonly post: <A>(
    path: string,
    schema: Schema.Decoder<A>,
    body: unknown,
  ) => Effect.Effect<A, PaystackApiError | PaystackRequestError>

  readonly put: <A>(
    path: string,
    schema: Schema.Decoder<A>,
    body: unknown,
  ) => Effect.Effect<A, PaystackApiError | PaystackRequestError>

  readonly del: <A>(
    path: string,
    schema: Schema.Decoder<A>,
  ) => Effect.Effect<A, PaystackApiError | PaystackRequestError>
}

export class Service extends Context.Service<Service, Interface>()("paystack-effect/runtime/PaystackHttpClient") {}

export const layer: Layer.Layer<Service, never, PaystackConfig> = Layer.effect(
  Service,
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient
    const { apiKey } = yield* PaystackConfig

    const scopedClient = client.pipe(
      HttpClient.mapRequest((req) =>
        req.pipe(
          HttpClientRequest.prependUrl(BASE_URL),
          HttpClientRequest.setHeader("user-agent", USER_AGENT),
          HttpClientRequest.bearerToken(Redacted.value(apiKey)),
        ),
      ),
      HttpClient.filterStatusOk,
      HttpClient.retryTransient({}),
    )

    const decodeOrFail = <A>(
      req: HttpClientRequest.HttpClientRequest,
      schema: Schema.Decoder<A>,
    ): Effect.Effect<A, PaystackApiError | PaystackRequestError> => {
      // req.url is the path as built by get/post/put/del, before
      // HttpClient.mapRequest prepends BASE_URL — reconstruct the full
      // URL here so error payloads are actually debuggable against the
      // real request that went out.
      const fullUrl = req.url.startsWith("http") ? req.url : `${BASE_URL}${req.url}`

      return scopedClient.execute(req).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
        Effect.catch((err): Effect.Effect<never, PaystackApiError | PaystackRequestError> => {
          if (HttpClientError.isHttpClientError(err)) {
            if (err.reason._tag === "StatusCodeError") {
              const response = err.reason.response
              return response.json.pipe(
                Effect.flatMap((body) =>
                  Effect.fail(
                    new PaystackApiError({
                      status: response.status,
                      requestUrl: fullUrl,
                      message:
                        typeof body === "object" && body !== null && "message" in body
                          ? String((body as { message: unknown }).message)
                          : "Paystack API error",
                      body,
                    }),
                  ),
                ),
                Effect.mapError(
                  () =>
                    new PaystackApiError({
                      status: response.status,
                      requestUrl: fullUrl,
                      message: "Paystack API error",
                      body: null,
                    }),
                ),
              )
            }
          }

          return Effect.fail(
            new PaystackRequestError({
              message: err.message || "Paystack request failed",
              cause: err,
            }),
          )
        }),
      )
    }

    const get = Effect.fn("PaystackHttpClient.get")(function* <A>(
      path: string,
      schema: Schema.Decoder<A>,
      query?: Record<string, QueryValue>,
    ): Effect.fn.Return<A, PaystackApiError | PaystackRequestError> {
      const qs = encodeQuery(query)
      return yield* decodeOrFail(HttpClientRequest.get(qs ? `${path}?${qs}` : path), schema)
    })

    const post = Effect.fn("PaystackHttpClient.post")(function* <A>(
      path: string,
      schema: Schema.Decoder<A>,
      body: unknown,
    ): Effect.fn.Return<A, PaystackApiError | PaystackRequestError> {
      return yield* decodeOrFail(HttpClientRequest.post(path).pipe(HttpClientRequest.bodyJsonUnsafe(body)), schema)
    })

    const put = Effect.fn("PaystackHttpClient.put")(function* <A>(
      path: string,
      schema: Schema.Decoder<A>,
      body: unknown,
    ): Effect.fn.Return<A, PaystackApiError | PaystackRequestError> {
      return yield* decodeOrFail(HttpClientRequest.put(path).pipe(HttpClientRequest.bodyJsonUnsafe(body)), schema)
    })

    const del = Effect.fn("PaystackHttpClient.del")(function* <A>(
      path: string,
      schema: Schema.Decoder<A>,
    ): Effect.fn.Return<A, PaystackApiError | PaystackRequestError> {
      return yield* decodeOrFail(HttpClientRequest.delete(path), schema)
    })

    return Service.of({ get, post, put, del })
  }),
).pipe(Layer.provide(FetchHttpClient.layer))

export * as PaystackHttpClient from "./runtime.js"
