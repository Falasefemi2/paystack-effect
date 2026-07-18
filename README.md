# paystack-effect

An Effect-native TypeScript SDK client, declarative `HttpApi`, and Bun HTTP mock/documentation server for the Paystack API.

This package provides a type-safe, functional integration wrapper for Paystack leveraging **Effect TS**. It can be consumed either as an Effect-native SDK library in your TypeScript applications, or run as a standalone mock server exposing Swagger documentation.

## Installation

```bash
npm install paystack-effect
# or using bun
bun add paystack-effect
```

## Consuming as a Library

To use the library in your Effect TS workflows:

### 1. Configure the Client Layer
Provide your API key and map the client SDK to your application's environment.

```typescript
import { Effect, Layer } from "effect"
import { PaystackHttpClient, Transaction } from "paystack-effect"

// Create the live HTTP client layer with your config
const PaystackConfigLive = PaystackHttpClient.layerConfig({
  apiKey: "YOUR_PAYSTACK_SECRET_KEY"
})

const PaystackClientLive = PaystackHttpClient.layer.pipe(
  Layer.provide(PaystackConfigLive)
)
```

### 2. Invoke SDK Services
Use the API modules directly in functional generators:

```typescript
import { Effect } from "effect"
import { Transaction } from "paystack-effect"

const initializePayment = Effect.gen(function* () {
  const transactionService = yield* Transaction.Service
  
  const response = yield* transactionService.initialize({
    email: "customer@example.com",
    amount: 500000, // 5,000 NGN in kobo
    metadata: JSON.stringify({ cartId: "12345" })
  })

  console.log("Payment link initialized:", response.data?.authorization_url)
  return response
})

// Run the effect providing the Paystack layers
Effect.runPromise(
  initializePayment.pipe(
    Effect.provide(Transaction.layer),
    Effect.provide(PaystackClientLive)
  )
)
```

---

## Declarative HttpApi & Documentation Server

In addition to serving as an SDK library, this repository contains a complete declarative `HttpApi` representation mapping all 20 Paystack resource endpoints, complete with their request/response schemas, error tags, and security descriptors.

### Start the REST Server
You can run the mock/documentation server locally using Bun:

```bash
# Start the server (runs on port 3000 by default)
bun run start
```

- **OpenAPI Json Document**: Available at `http://localhost:3000/openapi.json`
- **Swagger Documentation UI**: Available at `http://localhost:3000/docs`

---

## Development & Build

If you are developing or extending `paystack-effect`:

```bash
# Format and lint check
bun run check

# Build the JS / typings outputs for publishing
bun run build
```

## Issues & Support

Kindly [open an issue](https://github.com/Falasefemi2/paystack-effect/issues) if you discover any bugs or have feature requests.

## License

This repository is available under the MIT license. Read the [LICENSE](https://github.com/Falasefemi2/paystack-effect/blob/main/LICENSE) file for more information.