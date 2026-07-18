import { Schema } from "effect"
import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiMiddleware,
  HttpApiSecurity,
  OpenApi,
} from "effect/unstable/httpapi"
import {
  BulkChargeInitiate,
  ChargeCreate,
  ChargeSubmitAddress,
  ChargeSubmitBirthday,
  ChargeSubmitOTP,
  ChargeSubmitPhone,
  ChargeSubmitPin,
  CustomerCreate,
  CustomerDeactivateAuthorization,
  CustomerRiskAction,
  CustomerUpdate,
  CustomerValidation,
  DedicatedVirtualAccountCreate,
  DedicatedVirtualAccountSplit,
  DisputeEvidence,
  DisputeResolve,
  DisputeUpdate,
  ModelError,
  PageCreate,
  PageProduct,
  PageUpdate,
  PaymentRequestCreate,
  PaymentRequestUpdate,
  PlanCreate,
  PlanUpdate,
  ProductCreate,
  ProductUpdate,
  RefundCreate,
  Response,
  SplitCreate,
  SplitSubaccounts,
  SplitUpdate,
  SubaccountCreate,
  SubaccountUpdate,
  SubscriptionCreate,
  SubscriptionToggle,
  TransactionChargeAuthorization,
  TransactionCheckAuthorization,
  TransactionInitialize,
  TransactionPartialDebit,
  TransferBulk,
  TransferFinalize,
  TransferFinalizeDisableOTP,
  TransferInitiate,
  TransferRecipientBulk,
  TransferRecipientCreate,
  TransferRecipientUpdate,
  TransferResendOTP,
} from "../models/index.js"

export class Authentication extends HttpApiMiddleware.Service<Authentication>()("Authentication", {
  security: {
    bearer: HttpApiSecurity.bearer,
  },
}) {}

export class BalanceGroup extends HttpApiGroup.make("Balance")
  .add(
    HttpApiEndpoint.get("fetch", "/balance", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("ledger", "/balance/ledger", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class BulkChargeGroup extends HttpApiGroup.make("BulkCharge")
  .add(
    HttpApiEndpoint.post("initiate", "/bulkcharge", {
      payload: Schema.Array(BulkChargeInitiate),
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/bulkcharge", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/bulkcharge/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("charges", "/bulkcharge/:id_or_code/charges", {
      params: {
        id_or_code: Schema.String,
      },
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("pause", "/bulkcharge/pause/:batch_code", {
      params: {
        batch_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("resume", "/bulkcharge/resume/:batch_code", {
      params: {
        batch_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class ChargeGroup extends HttpApiGroup.make("Charge")
  .add(
    HttpApiEndpoint.get("check", "/charge/:reference", {
      params: {
        reference: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("create", "/charge", {
      payload: ChargeCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("submitAddress", "/charge/submit_address", {
      payload: ChargeSubmitAddress,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("submitBirthday", "/charge/submit_birthday", {
      payload: ChargeSubmitBirthday,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("submitOtp", "/charge/submit_otp", {
      payload: ChargeSubmitOTP,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("submitPhone", "/charge/submit_phone", {
      payload: ChargeSubmitPhone,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("submitPin", "/charge/submit_pin", {
      payload: ChargeSubmitPin,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class CustomerGroup extends HttpApiGroup.make("Customer")
  .add(
    HttpApiEndpoint.post("create", "/customer", {
      payload: CustomerCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/customer", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/customer/:email_or_code", {
      params: {
        email_or_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/customer/:code", {
      params: {
        code: Schema.String,
      },
      payload: CustomerUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("validate", "/customer/:code/identification", {
      params: {
        code: Schema.String,
      },
      payload: CustomerValidation,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("riskAction", "/customer/set_risk_action", {
      payload: CustomerRiskAction,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("deactivateAuthorization", "/customer/deactivate_authorization", {
      payload: CustomerDeactivateAuthorization,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class DedicatedVirtualAccountGroup extends HttpApiGroup.make("DedicatedVirtualAccount")
  .add(
    HttpApiEndpoint.post("addSplit", "/dedicated_account/split", {
      payload: DedicatedVirtualAccountSplit,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("availableProviders", "/dedicated_account/available_providers", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("create", "/dedicated_account", {
      payload: DedicatedVirtualAccountCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.delete("deactivate", "/dedicated_account/:accountId", {
      params: {
        accountId: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/dedicated_account/:accountId", {
      params: {
        accountId: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/dedicated_account", {
      query: {
        accountNumber: Schema.optionalKey(Schema.String),
        customer: Schema.optionalKey(Schema.String),
        active: Schema.optionalKey(Schema.Boolean),
        currency: Schema.optionalKey(Schema.String),
        providerSlug: Schema.optionalKey(Schema.String),
        bankId: Schema.optionalKey(Schema.String),
        perPage: Schema.optionalKey(Schema.String),
        page: Schema.optionalKey(Schema.String),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.delete("removeSplit", "/dedicated_account/split", {
      payload: DedicatedVirtualAccountSplit,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class DisputeGroup extends HttpApiGroup.make("Dispute")
  .add(
    HttpApiEndpoint.get("download", "/dispute/export", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("evidence", "/dispute/:id/evidence", {
      params: {
        id: Schema.String,
      },
      payload: DisputeEvidence,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/dispute/:id", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/dispute", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        transaction: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("resolve", "/dispute/:id/resolve", {
      params: {
        id: Schema.String,
      },
      payload: DisputeResolve,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("transaction", "/dispute/transaction/:id", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/dispute/:id", {
      params: {
        id: Schema.String,
      },
      payload: DisputeUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("uploadUrl", "/dispute/:id/upload_url", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class IntegrationGroup extends HttpApiGroup.make("Integration")
  .add(
    HttpApiEndpoint.get("fetchPaymentSessionTimeout", "/integration/payment_session_timeout", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("updatePaymentSessionTimeout", "/integration/payment_session_timeout", {
      payload: Schema.Record(Schema.String, Schema.Unknown),
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class PageGroup extends HttpApiGroup.make("Page")
  .add(
    HttpApiEndpoint.post("create", "/page", {
      payload: PageCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/page/:id_or_slug", {
      params: {
        id_or_slug: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/page", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/page/:id_or_slug", {
      params: {
        id_or_slug: Schema.String,
      },
      payload: PageUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("addProduct", "/page/:id/product", {
      params: {
        id: Schema.String,
      },
      payload: PageProduct,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class PaymentRequestGroup extends HttpApiGroup.make("PaymentRequest")
  .add(
    HttpApiEndpoint.post("create", "/paymentrequest", {
      payload: PaymentRequestCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/paymentrequest", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        customer: Schema.optionalKey(Schema.String),
        status: Schema.optionalKey(Schema.String),
        currency: Schema.optionalKey(Schema.String),
        include_archive: Schema.optionalKey(Schema.Boolean),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/paymentrequest/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/paymentrequest/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      payload: PaymentRequestUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("verify", "/paymentrequest/verify/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("sendNotification", "/paymentrequest/send_notification/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("totals", "/paymentrequest/totals", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("archive", "/paymentrequest/archive/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class PlanGroup extends HttpApiGroup.make("Plan")
  .add(
    HttpApiEndpoint.post("create", "/plan", {
      payload: PlanCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/plan", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        interval: Schema.optionalKey(Schema.String),
        amount: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/plan/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/plan/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      payload: PlanUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class ProductGroup extends HttpApiGroup.make("Product")
  .add(
    HttpApiEndpoint.post("create", "/product", {
      payload: ProductCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/product", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        active: Schema.optionalKey(Schema.Boolean),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/product/:id", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/product/:id", {
      params: {
        id: Schema.String,
      },
      payload: ProductUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class RefundGroup extends HttpApiGroup.make("Refund")
  .add(
    HttpApiEndpoint.post("create", "/refund", {
      payload: RefundCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/refund", {
      query: {
        reference: Schema.optionalKey(Schema.String),
        currency: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/refund/:reference", {
      params: {
        reference: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class SettlementGroup extends HttpApiGroup.make("Settlement")
  .add(
    HttpApiEndpoint.get("fetch", "/settlement", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("transactions", "/settlement/:id/transactions", {
      params: {
        id: Schema.String,
      },
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class SplitGroup extends HttpApiGroup.make("Split")
  .add(
    HttpApiEndpoint.post("create", "/split", {
      payload: SplitCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/split", {
      query: {
        name: Schema.optionalKey(Schema.String),
        active: Schema.optionalKey(Schema.Boolean),
        sort_by: Schema.optionalKey(Schema.String),
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/split/:id", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/split/:id", {
      params: {
        id: Schema.String,
      },
      payload: SplitUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("addSubaccount", "/split/:id/subaccount/add", {
      params: {
        id: Schema.String,
      },
      payload: SplitSubaccounts,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("removeSubaccount", "/split/:id/subaccount/remove", {
      params: {
        id: Schema.String,
      },
      payload: SplitSubaccounts,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class SubaccountGroup extends HttpApiGroup.make("Subaccount")
  .add(
    HttpApiEndpoint.post("create", "/subaccount", {
      payload: SubaccountCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/subaccount", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/subaccount/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("update", "/subaccount/:id_or_code", {
      params: {
        id_or_code: Schema.String,
      },
      payload: SubaccountUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class SubscriptionGroup extends HttpApiGroup.make("Subscription")
  .add(
    HttpApiEndpoint.post("create", "/subscription", {
      payload: SubscriptionCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("disable", "/subscription/disable", {
      payload: SubscriptionToggle,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("enable", "/subscription/enable", {
      payload: SubscriptionToggle,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/subscription/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/subscription", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        plan: Schema.optionalKey(Schema.String),
        customer: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("manageEmail", "/subscription/:code/manage/email", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("manageLink", "/subscription/:code/manage/link", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class TransactionGroup extends HttpApiGroup.make("Transaction")
  .add(
    HttpApiEndpoint.post("chargeAuthorization", "/transaction/charge_authorization", {
      payload: TransactionChargeAuthorization,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("checkAuthorization", "/transaction/check_authorization", {
      payload: TransactionCheckAuthorization,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("download", "/transaction/export", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("event", "/transaction/:id/event", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/transaction/:id", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("initialize", "/transaction/initialize", {
      payload: TransactionInitialize,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/transaction", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("partialDebit", "/transaction/partial_debit", {
      payload: TransactionPartialDebit,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("session", "/transaction/:id/session", {
      params: {
        id: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("timeline", "/transaction/timeline/:id_or_reference", {
      params: {
        id_or_reference: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("totals", "/transaction/totals", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("verify", "/transaction/verify/:reference", {
      params: {
        reference: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class TransferGroup extends HttpApiGroup.make("Transfer")
  .add(
    HttpApiEndpoint.post("bulk", "/transfer/bulk", {
      payload: TransferBulk,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("disableOtp", "/transfer/disable_otp", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("disableOtpFinalize", "/transfer/disable_otp_finalize", {
      payload: TransferFinalizeDisableOTP,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("download", "/transfer/export", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("enableOtp", "/transfer/enable_otp", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/transfer/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("finalize", "/transfer/finalize_transfer", {
      payload: TransferFinalize,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("initiate", "/transfer", {
      payload: TransferInitiate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/transfer", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        status: Schema.optionalKey(Schema.String),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("resendOtp", "/transfer/resend_otp", {
      payload: TransferResendOTP,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("verify", "/transfer/verify/:reference", {
      params: {
        reference: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class TransferRecipientGroup extends HttpApiGroup.make("TransferRecipient")
  .add(
    HttpApiEndpoint.post("bulk", "/transferrecipient/bulk", {
      payload: TransferRecipientBulk,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.post("create", "/transferrecipient", {
      payload: TransferRecipientCreate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetch", "/transferrecipient/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("list", "/transferrecipient", {
      query: {
        perPage: Schema.optionalKey(Schema.Number),
        page: Schema.optionalKey(Schema.Number),
        from: Schema.optionalKey(Schema.Date),
        to: Schema.optionalKey(Schema.Date),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.delete("transferrecipientCodeDelete", "/transferrecipient/:code", {
      params: {
        code: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.put("transferrecipientCodePut", "/transferrecipient/:code", {
      params: {
        code: Schema.String,
      },
      payload: TransferRecipientUpdate,
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class VerificationGroup extends HttpApiGroup.make("Verification")
  .add(
    HttpApiEndpoint.get("avs", "/address_verification/states", {
      query: {
        type: Schema.optionalKey(Schema.String),
        country: Schema.optionalKey(Schema.String),
        currency: Schema.optionalKey(Schema.String),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("fetchBanks", "/bank", {
      query: {
        country: Schema.optionalKey(Schema.String),
        pay_with_bank_transfer: Schema.optionalKey(Schema.Boolean),
        use_cursor: Schema.optionalKey(Schema.Boolean),
        perPage: Schema.optionalKey(Schema.Number),
        next: Schema.optionalKey(Schema.String),
        previous: Schema.optionalKey(Schema.String),
        gateway: Schema.optionalKey(Schema.String),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("listCountries", "/country", {
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("resolveAccountNumber", "/bank/resolve", {
      query: {
        account_number: Schema.optionalKey(Schema.Number),
        bank_code: Schema.optionalKey(Schema.Number),
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  )
  .add(
    HttpApiEndpoint.get("resolveCardBin", "/decision/bin/:bin", {
      params: {
        bin: Schema.String,
      },
      success: Response,
      error: ModelError,
    }).middleware(Authentication),
  ) {}

export class Api extends HttpApi.make("Paystack")
  .add(BalanceGroup)
  .add(BulkChargeGroup)
  .add(ChargeGroup)
  .add(CustomerGroup)
  .add(DedicatedVirtualAccountGroup)
  .add(DisputeGroup)
  .add(IntegrationGroup)
  .add(PageGroup)
  .add(PaymentRequestGroup)
  .add(PlanGroup)
  .add(ProductGroup)
  .add(RefundGroup)
  .add(SettlementGroup)
  .add(SplitGroup)
  .add(SubaccountGroup)
  .add(SubscriptionGroup)
  .add(TransactionGroup)
  .add(TransferGroup)
  .add(TransferRecipientGroup)
  .add(VerificationGroup)
  .annotateMerge(
    OpenApi.annotations({
      title: "Paystack API",
      description: "The OpenAPI specification of the Paystack API",
      version: "1.0.0",
    }),
  ) {}
