import { BunHttpServer, BunRuntime } from "@effect/platform-bun"
import { Effect, Layer } from "effect"
import { HttpMiddleware, HttpRouter } from "effect/unstable/http"
import { HttpApiBuilder, HttpApiSwagger } from "effect/unstable/httpapi"
import { Api, Authentication } from "./apis/Api.js"
import {
  Balance,
  BulkCharge,
  Charge,
  Customer,
  DedicatedVirtualAccount,
  Dispute,
  Integration,
  Page,
  PaymentRequest,
  Plan,
  Product,
  Refund,
  Settlement,
  Split,
  Subaccount,
  Subscription,
  Transaction,
  Transfer,
  TransferRecipient,
  Verification,
} from "./apis/index.js"
import { layerConfigFromEnv, PaystackHttpClient } from "./runtime.js"

// Middleware implementation for Bearer authentication
const AuthenticationLive = Layer.succeed(
  Authentication,
  Authentication.of({
    bearer: (httpEffect: Effect.Effect<any, any, any>) => httpEffect,
  }),
)

// Helper to map client SDK errors to the declared ModelError format
const mapToModelError = (error: unknown): { readonly status: boolean; readonly message: string } => {
  if (typeof error === "object" && error !== null && "message" in error) {
    return {
      status: false,
      message: String((error as any).message),
    }
  }
  return {
    status: false,
    message: "An unknown error occurred",
  }
}

// Implementation of Balance Group handlers
const BalanceLive = HttpApiBuilder.group(Api, "Balance", (handlers) =>
  handlers
    .handle("fetch", () =>
      Effect.gen(function* () {
        const service = yield* Balance.Service
        return yield* service.fetch()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("ledger", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Balance.Service
        return yield* service.ledger(query)
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of BulkCharge Group handlers
const BulkChargeLive = HttpApiBuilder.group(Api, "BulkCharge", (handlers) =>
  handlers
    .handle("initiate", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.initiate(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.fetch({ code: params.id_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("charges", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.charges({ code: params.id_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("pause", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.pause({ code: params.batch_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("resume", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* BulkCharge.Service
        return yield* service.resume({ code: params.batch_code })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Charge Group handlers
const ChargeLive = HttpApiBuilder.group(Api, "Charge", (handlers) =>
  handlers
    .handle("check", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.check({ reference: params.reference })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("submitAddress", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.submitAddress(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("submitBirthday", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.submitBirthday(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("submitOtp", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.submitOtp(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("submitPhone", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.submitPhone(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("submitPin", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Charge.Service
        return yield* service.submitPin(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Customer Group handlers
const CustomerLive = HttpApiBuilder.group(Api, "Customer", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.list({
          ...query,
          perPage: query.perPage !== undefined ? String(query.perPage) : undefined,
          page: query.page !== undefined ? String(query.page) : undefined,
          from: query.from?.toISOString(),
          to: query.to?.toISOString(),
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.fetch({ code: params.email_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.update({ code: params.code, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("validate", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.validate({ code: params.code, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("riskAction", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.riskAction({
          customer: payload.reference,
          riskAction: payload.riskAction,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("deactivateAuthorization", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Customer.Service
        return yield* service.deactivateAuthorization(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of DedicatedVirtualAccount Group handlers
const DedicatedVirtualAccountLive = HttpApiBuilder.group(Api, "DedicatedVirtualAccount", (handlers) =>
  handlers
    .handle("addSplit", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.addSplit(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("availableProviders", () =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.availableProviders()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("deactivate", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.deactivate({ accountId: params.accountId })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.fetch({ accountId: params.accountId })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("removeSplit", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* DedicatedVirtualAccount.Service
        return yield* service.removeSplit(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Dispute Group handlers
const DisputeLive = HttpApiBuilder.group(Api, "Dispute", (handlers) =>
  handlers
    .handle("download", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.download(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("evidence", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.evidence({
          id: params.id,
          customerEmail: payload.customerEmail,
          customerName: payload.customerName,
          customerPhone: payload.customerPhone,
          serviceDetails: payload.serviceDetails,
          deliveryAddress: payload.deliveryAddress,
          deliveryDate: payload.deliveryDate ? new Date(payload.deliveryDate) : undefined,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.fetch({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("resolve", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.resolve({
          id: params.id,
          resolution: payload.resolution,
          message: payload.message,
          refundAmount: payload.refundAmount,
          uploadedFilename: payload.uploadedFilename,
          evidence: payload.evidence ? Number(payload.evidence) : undefined,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("transaction", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.transaction({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.update({ id: params.id, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("uploadUrl", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Dispute.Service
        return yield* service.uploadUrl({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Integration Group handlers
const IntegrationLive = HttpApiBuilder.group(Api, "Integration", (handlers) =>
  handlers
    .handle("fetchPaymentSessionTimeout", () =>
      Effect.gen(function* () {
        const service = yield* Integration.Service
        return yield* service.fetchPaymentSessionTimeout()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("updatePaymentSessionTimeout", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Integration.Service
        return yield* service.updatePaymentSessionTimeout({ body: payload })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Page Group handlers
const PageLive = HttpApiBuilder.group(Api, "Page", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Page.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Page.Service
        return yield* service.fetch({ id: params.id_or_slug })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Page.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Page.Service
        return yield* service.update({ id: params.id_or_slug, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("addProduct", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Page.Service
        return yield* service.addProducts({
          id: params.id,
          product: [...payload.product],
        })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of PaymentRequest Group handlers
const PaymentRequestLive = HttpApiBuilder.group(Api, "PaymentRequest", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.fetch({ id: params.id_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.update({ id: params.id_or_code, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("verify", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.verify({ id: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("sendNotification", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.notify({ id: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("totals", () =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.totals()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("archive", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* PaymentRequest.Service
        return yield* service.archive({ id: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Plan Group handlers
const PlanLive = HttpApiBuilder.group(Api, "Plan", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Plan.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Plan.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Plan.Service
        return yield* service.fetch({ code: params.id_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Plan.Service
        return yield* service.update({
          ...payload,
          code: params.id_or_code,
          description: payload.description as any,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Product Group handlers
const ProductLive = HttpApiBuilder.group(Api, "Product", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Product.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Product.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Product.Service
        return yield* service.fetch({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Product.Service
        return yield* service.update({ id: params.id, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Refund Group handlers
const RefundLive = HttpApiBuilder.group(Api, "Refund", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Refund.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Refund.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Refund.Service
        return yield* service.fetch({ id: params.reference })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Settlement Group handlers
const SettlementLive = HttpApiBuilder.group(Api, "Settlement", (handlers) =>
  handlers
    .handle("fetch", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Settlement.Service
        return yield* service.fetch(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("transactions", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Settlement.Service
        return yield* service.transaction({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Split Group handlers
const SplitLive = HttpApiBuilder.group(Api, "Split", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.create({
          ...payload,
          subaccounts: [...payload.subaccounts],
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.list({
          ...query,
          active: query.active !== undefined ? String(query.active) : undefined,
          perPage: query.perPage !== undefined ? String(query.perPage) : undefined,
          page: query.page !== undefined ? String(query.page) : undefined,
          from: query.from?.toISOString(),
          to: query.to?.toISOString(),
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.fetch({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.update({ id: params.id, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("addSubaccount", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.addSubaccount({ id: params.id, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("removeSubaccount", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Split.Service
        return yield* service.removeSubaccount({ id: params.id, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Subaccount Group handlers
const SubaccountLive = HttpApiBuilder.group(Api, "Subaccount", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Subaccount.Service
        return yield* service.create({
          business_name: payload.businessName,
          settlement_bank: payload.settlementBank,
          account_number: payload.accountNumber,
          percentage_charge: payload.percentageCharge,
          description: payload.description,
          primary_contact_email: payload.primaryContactEmail,
          primary_contact_name: payload.primaryContactName,
          primary_contact_phone: payload.primaryContactPhone,
          metadata: payload.metadata,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Subaccount.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Subaccount.Service
        return yield* service.fetch({ code: params.id_or_code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("update", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* Subaccount.Service
        return yield* service.update({
          code: params.id_or_code,
          business_name: payload.businessName,
          settlement_bank: payload.settlementBank,
          account_number: payload.accountNumber,
          percentage_charge: payload.percentageCharge,
          description: payload.description,
          primary_contact_email: payload.primaryContactEmail,
          primary_contact_name: payload.primaryContactName,
          primary_contact_phone: payload.primaryContactPhone,
          metadata: payload.metadata,
          active: payload.active,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Subscription Group handlers
const SubscriptionLive = HttpApiBuilder.group(Api, "Subscription", (handlers) =>
  handlers
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.create(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("disable", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.disable(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("enable", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.enable(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.fetch({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("manageEmail", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.manageEmail({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("manageLink", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Subscription.Service
        return yield* service.manageLink({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Transaction Group handlers
const TransactionLive = HttpApiBuilder.group(Api, "Transaction", (handlers) =>
  handlers
    .handle("chargeAuthorization", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.chargeAuthorization({
          email: payload.email,
          amount: payload.amount,
          authorization_code: payload.authorizationCode,
          reference: payload.reference,
          currency: payload.currency,
          metadata: payload.metadata,
          split_code: payload.splitCode,
          subaccount: payload.subaccount,
          transaction_charge: payload.transactionCharge,
          bearer: payload.bearer,
          queue: payload.queue,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("checkAuthorization", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.checkAuthorization(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("download", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.download(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("event", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.event({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.fetch({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("initialize", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.initialize({
          ...payload,
          channels: payload.channels ? [...payload.channels] : undefined,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("partialDebit", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.partialDebit({
          email: payload.email,
          amount: payload.amount,
          authorization_code: payload.authorizationCode,
          currency: payload.currency,
          reference: payload.reference,
          at_least: payload.atLeast,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("session", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.session({ id: params.id })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("timeline", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.timeline({ id_or_reference: params.id_or_reference })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("totals", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.totals(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("verify", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transaction.Service
        return yield* service.verify({ reference: params.reference })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Transfer Group handlers
const TransferLive = HttpApiBuilder.group(Api, "Transfer", (handlers) =>
  handlers
    .handle("bulk", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.bulk({
          source: payload.source,
          transfers: payload.transfers ? [...payload.transfers] : undefined,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("disableOtp", () =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.disableOtp()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("disableOtpFinalize", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.disableOtpFinalize(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("download", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.download(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("enableOtp", () =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.enableOtp()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.fetch({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("finalize", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.finalize({
          transfer_code: payload.transferCode,
          otp: payload.otp,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("initiate", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.initiate(payload)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("resendOtp", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.resendOtp({
          transfer_code: payload.transferCode,
          reason: payload.reason,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("verify", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Transfer.Service
        return yield* service.verify({ reference: params.reference })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of TransferRecipient Group handlers
const TransferRecipientLive = HttpApiBuilder.group(Api, "TransferRecipient", (handlers) =>
  handlers
    .handle("bulk", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.bulk({
          batch: [...payload.batch],
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("create", ({ payload }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.create({
          type: payload.type,
          name: payload.name,
          account_number: payload.accountNumber,
          bank_code: payload.bankCode,
          description: payload.description,
          currency: payload.currency,
          authorization_code: payload.authorizationCode,
          metadata: payload.metadata,
        })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetch", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.fetch({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("list", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.list(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("transferrecipientCodeDelete", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.transferrecipientCodeDelete({ code: params.code })
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("transferrecipientCodePut", ({ params, payload }) =>
      Effect.gen(function* () {
        const service = yield* TransferRecipient.Service
        return yield* service.transferrecipientCodePut({ code: params.code, ...payload })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Implementation of Verification Group handlers
const VerificationLive = HttpApiBuilder.group(Api, "Verification", (handlers) =>
  handlers
    .handle("avs", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Verification.Service
        return yield* service.avs(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("fetchBanks", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Verification.Service
        return yield* service.fetchBanks(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("listCountries", () =>
      Effect.gen(function* () {
        const service = yield* Verification.Service
        return yield* service.listCountries()
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("resolveAccountNumber", ({ query }) =>
      Effect.gen(function* () {
        const service = yield* Verification.Service
        return yield* service.resolveAccountNumber(query)
      }).pipe(Effect.mapError(mapToModelError)),
    )
    .handle("resolveCardBin", ({ params }) =>
      Effect.gen(function* () {
        const service = yield* Verification.Service
        return yield* service.resolveCardBin({ bin: params.bin })
      }).pipe(Effect.mapError(mapToModelError)),
    ),
)

// Merge all business logic API services together
const ServicesLive = Layer.mergeAll(
  BalanceLive,
  BulkChargeLive,
  ChargeLive,
  CustomerLive,
  DedicatedVirtualAccountLive,
  DisputeLive,
  IntegrationLive,
  PageLive,
  PaymentRequestLive,
  PlanLive,
  ProductLive,
  RefundLive,
  SettlementLive,
  SplitLive,
  SubaccountLive,
  SubscriptionLive,
  TransactionLive,
  TransferLive,
  TransferRecipientLive,
  VerificationLive,
)

// Merge all underlying SDK client live implementations
const SdkServicesLive = Layer.mergeAll(
  Balance.layer,
  BulkCharge.layer,
  Charge.layer,
  Customer.layer,
  DedicatedVirtualAccount.layer,
  Dispute.layer,
  Integration.layer,
  Page.layer,
  PaymentRequest.layer,
  Plan.layer,
  Product.layer,
  Refund.layer,
  Settlement.layer,
  Split.layer,
  Subaccount.layer,
  Subscription.layer,
  Transaction.layer,
  Transfer.layer,
  TransferRecipient.layer,
  Verification.layer,
)

// ApiRoutes layer mounts the API handlers and incorporates ServicesLive BEFORE the server
const ApiRoutes = HttpApiBuilder.layer(Api, { openapiPath: "/openapi.json" }).pipe(Layer.provide(ServicesLive))

// DocsRoute layer mounts the Swagger UI
const DocsRoute = HttpApiSwagger.layer(Api, { path: "/docs" })

// Merge all routing layers together
const AllRoutes = Layer.mergeAll(ApiRoutes, DocsRoute)

// Build HTTP Server Layer
const HttpServerLayer = HttpRouter.serve(AllRoutes, {
  middleware: (app) =>
    app.pipe(
      HttpMiddleware.cors({
        allowedOrigins: ["http://localhost:3001"],
        allowedMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "traceparent",
          "tracestate",
          "b3",
          "x-b3-traceid",
          "x-b3-spanid",
          "x-b3-sampled",
          "baggage",
        ],
        credentials: true,
      }),
    ),
}).pipe(
  Layer.provide(
    BunHttpServer.layer({
      port: 3000,
    }),
  ),
)

// Combine everything into AppLayer
const AppLayer = HttpServerLayer.pipe(
  Layer.provide(SdkServicesLive),
  Layer.provide(PaystackHttpClient.layer),
  Layer.provide(layerConfigFromEnv),
  Layer.provide(AuthenticationLive),
)

BunRuntime.runMain(Layer.launch(AppLayer))
