# Audit Report - Paystack OpenAPI Models

## 1. Key Mapping Completeness & Type-vs-JSDoc Mismatches & Delegation

| File | Field | Category | Description | Proposed Fix |
| --- | --- | --- | --- | --- |
| [Accepted.ts](file://c:/Users/FEMI/paystack-effect/models/Accepted.ts) | - | FromJSON DELEGATION | AcceptedFromJSON does not delegate to AcceptedFromJSONTyped. It contains: `Schema.decodeUnknownSync(Accepted)(json)`. | Update AcceptedFromJSON to return `AcceptedFromJSONTyped(json)`. |
| [Bank.ts](file://c:/Users/FEMI/paystack-effect/models/Bank.ts) | - | FromJSON DELEGATION | BankFromJSON does not delegate to BankFromJSONTyped. It contains: `Schema.decodeUnknownSync(Bank)(json)`. | Update BankFromJSON to return `BankFromJSONTyped(json)`. |
| [BulkChargeInitiate.ts](file://c:/Users/FEMI/paystack-effect/models/BulkChargeInitiate.ts) | - | FromJSON DELEGATION | BulkChargeInitiateFromJSON does not delegate to BulkChargeInitiateFromJSONTyped. It contains: `Schema.decodeUnknownSync(BulkChargeInitiate)(json)`. | Update BulkChargeInitiateFromJSON to return `BulkChargeInitiateFromJSONTyped(json)`. |
| [Response.ts](file://c:/Users/FEMI/paystack-effect/models/Response.ts) | - | NAMING COLLISION | Exported schema 'Response' shadows a global symbol. | Flag for human review of name mapping to avoid breaking consumer imports. |

## 2. Duplicated Schema Fragments

### Duplicated Literals

- Literals: `[annually, biannually, daily, monthly, weekly]` defined in:
  - [PlanCreate.ts](file://c:/Users/FEMI/paystack-effect/models/PlanCreate.ts)
  - [PlanUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/PlanUpdate.ts)
- Literals: `[GHS, NGN, USD, ZAR]` defined in:
  - [ProductCreate.ts](file://c:/Users/FEMI/paystack-effect/models/ProductCreate.ts)
  - [ProductUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/ProductUpdate.ts)
### Duplicated Custom Schemas

- Custom Schema: `DateFromString` defined in:
  - [PaymentRequestCreate.ts](file://c:/Users/FEMI/paystack-effect/models/PaymentRequestCreate.ts)
  - [PaymentRequestUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/PaymentRequestUpdate.ts)

## 3. Experimental API Surface (Schema.encodeKeys usages)

Usages of `Schema.encodeKeys` found in the following files:

- [ChargeCreate.ts](file://c:/Users/FEMI/paystack-effect/models/ChargeCreate.ts)
- [PageCreate.ts](file://c:/Users/FEMI/paystack-effect/models/PageCreate.ts)
- [PaymentRequestCreate.ts](file://c:/Users/FEMI/paystack-effect/models/PaymentRequestCreate.ts)
- [PaymentRequestUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/PaymentRequestUpdate.ts)
- [PlanCreate.ts](file://c:/Users/FEMI/paystack-effect/models/PlanCreate.ts)
- [PlanUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/PlanUpdate.ts)
- [RefundCreate.ts](file://c:/Users/FEMI/paystack-effect/models/RefundCreate.ts)
- [SplitCreate.ts](file://c:/Users/FEMI/paystack-effect/models/SplitCreate.ts)
- [SplitUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/SplitUpdate.ts)
- [SubaccountCreate.ts](file://c:/Users/FEMI/paystack-effect/models/SubaccountCreate.ts)
- [SubaccountUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/SubaccountUpdate.ts)
- [SubscriptionCreate.ts](file://c:/Users/FEMI/paystack-effect/models/SubscriptionCreate.ts)
- [SubscriptionToggle.ts](file://c:/Users/FEMI/paystack-effect/models/SubscriptionToggle.ts)
- [TransactionCheckAuthorization.ts](file://c:/Users/FEMI/paystack-effect/models/TransactionCheckAuthorization.ts)
- [TransactionInitialize.ts](file://c:/Users/FEMI/paystack-effect/models/TransactionInitialize.ts)
- [TransactionPartialDebit.ts](file://c:/Users/FEMI/paystack-effect/models/TransactionPartialDebit.ts)
- [TransferInitiate.ts](file://c:/Users/FEMI/paystack-effect/models/TransferInitiate.ts)
- [TransferRecipientCreate.ts](file://c:/Users/FEMI/paystack-effect/models/TransferRecipientCreate.ts)
- [TransferRecipientUpdate.ts](file://c:/Users/FEMI/paystack-effect/models/TransferRecipientUpdate.ts)
- [TransferResendOTP.ts](file://c:/Users/FEMI/paystack-effect/models/TransferResendOTP.ts)
- [USSD.ts](file://c:/Users/FEMI/paystack-effect/models/USSD.ts)
- [VerificationBVNMatch.ts](file://c:/Users/FEMI/paystack-effect/models/VerificationBVNMatch.ts)
