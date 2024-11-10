interface ISslCommerzRequestBody {
  total_amount: 100;
  currency: "BDT";
  tran_id: string; // use unique tran_id for each api call
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  shipping_method: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2: string;
  cus_city: string;
  cus_state: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  cus_fax: string;
  ship_name: string;
  ship_add1: string;
  ship_add2: string;
  ship_city: string;
  ship_state: string;
  ship_postcode: number;
  ship_country: string;
}

interface InitResponse {
  status: string;
  failedreason: string;
  sessionkey: string;
  gw: {
    visa: string;
    master: string;
    amex: string;
    othercards: string;
    internetbanking: string;
    mobilebanking: string;
  };
  redirectGatewayURL: string;
  directPaymentURLBank: string;
  directPaymentURLCard: string;
  directPaymentURL: string;
  redirectGatewayURLFailed: string;
  GatewayPageURL: string;
  storeBanner: string;
  storeLogo: string;
  desc: PaymentMethod[];
  is_direct_pay_enable: string;
}
interface TransactionValidationResponse {
  status: string;
  tran_date: string;
  tran_id: string;
  val_id: string;
  amount: string;
  store_amount: string;
  currency: string;
  bank_tran_id: string;
  card_type: string;
  card_no: string;
  card_issuer: string;
  card_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;
  currency_type: string;
  currency_amount: string;
  currency_rate: string;
  base_fair: string;
  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;
  emi_instalment: string;
  emi_amount: string;
  emi_description: string;
  emi_issuer: string;
  account_details: string;
  risk_title: string;
  risk_level: string;
  APIConnect: string;
  validated_on: string;
  gw_version: string;
}

interface RefundResponse {
  APIConnect: string;
  bank_tran_id: string;
  trans_id: string;
  refund_ref_id: string;
  status: string;
  errorReason: string;
}

interface QueryRefundResponse {
  APIConnect: string;
  bank_tran_id: string;
  tran_id: string;
  initiated_on: string;
  refunded_on: string;
  status: "refunded" | "processing" | "cancelled";
  refund_ref_id: string;
}

interface TransactionQueryResponse {
  status: string; // The status of the response (e.g., "VALID")
  sessionkey: string; // Session key for the transaction
  tran_date: string; // Transaction date in the format "YYYY-MM-DD HH:MM:SS"
  tran_id: string; // Transaction ID
  val_id: string; // Validation ID
  amount: string; // Total amount of the transaction
  store_amount: string; // Amount received by the store
  bank_tran_id: string; // Bank transaction ID
  card_type: string; // Card type (e.g., "VISA-Brac bank")
  card_no: string; // Card number (last 4 digits are visible)
  card_issuer: string; // Issuing bank or organization
  card_brand: string; // Card brand (e.g., "VISA")
  card_issuer_country: string; // Issuing country (e.g., "Bangladesh")
  card_issuer_country_code: string; // Country code (e.g., "BD")
  currency_type: string; // Currency type (e.g., "USD")
  currency_amount: string; // Amount in the transaction's currency
  currency_rate: string; // Exchange rate, if applicable
  base_fair: string; // Base fare (could be related to discounts, etc.)
  value_a: string; // Optional value field (could be used for custom data)
  value_b: string; // Optional value field (could be used for custom data)
  value_c: string; // Optional value field (could be used for custom data)
  value_d: string; // Optional value field (could be used for custom data)
  risk_title: string; // Risk level description (e.g., "Safe")
  risk_level: string; // Numerical risk level (e.g., "0")
  APIConnect: string; // API connection status (e.g., "DONE")
  validated_on: string; // Validation timestamp
  gw_version: string; // Gateway version (e.g., "3.00")
}

interface TransactionQueryByIdResponse {
  APIConnect: string; // Status of the API connection (e.g., "DONE")
  no_of_trans_found: number; // Number of transactions found
  element: SSLCommerzTransactionElement[]; // Array of transaction elements
}
interface SSLCommerzTransactionElement {
  val_id: string; // Validation ID
  status: string; // Status of the transaction (e.g., "VALIDATED", "FAILED")
  validated_on: string; // Date and time the transaction was validated
  currency_type: string; // Currency type (e.g., "USD")
  currency_amount: string; // Amount in the currency
  currency_rate: string; // Currency exchange rate (if applicable)
  base_fair: string; // Base fare
  value_a: string; // Custom value field
  value_b: string; // Custom value field
  value_c: string; // Custom value field
  value_d: string; // Custom value field
  tran_date: string; // Date and time of the transaction
  tran_id: string; // Transaction ID
  amount: string; // Total amount of the transaction
  store_amount: string; // Amount received by the store
  bank_tran_id: string; // Bank transaction ID
  card_type: string; // Card type used (e.g., "VISA-City Bank")
  risk_title: string; // Risk title (e.g., "Safe", "Not Safe")
  risk_level: string; // Risk level (e.g., "0", "1")
  currency: string; // Currency used in the transaction (e.g., "BDT")
  bank_gw: string; // Bank gateway used (e.g., "City Bank")
  card_no: string; // Last 4 digits of the card number (or empty)
  card_issuer: string; // Card issuer bank or institution (or empty)
  card_brand: string; // Card brand (e.g., "VISA")
  card_issuer_country: string; // Country of the card issuer (e.g., "Bangladesh")
  card_issuer_country_code: string; // Country code of the card issuer (e.g., "BD")
  gw_version: string; // Gateway version (e.g., "3.00")
  emi_instalment: string; // EMI installment count
  emi_amount: string; // EMI amount
  emi_description: string; // EMI description
  emi_issuer: string; // EMI issuer bank (if any)
  error: string; // Error message if the transaction failed (if any)
}

interface PaymentMethod {
  name: string;
  type: string;
  logo: string;
  gw: string;
  r_flag?: string; // Optional as not all methods have r_flag
  redirectGatewayURL: string;
}

interface IRefundRequestBody {
  refund_amount: number;
  refund_remarks: string;
  bank_tran_id: string;
  refe_id: string;
}

type SSLCommerzResponse<T> = {
  [K in keyof T]?: T[K];
};

declare module "sslcommerz-lts" {
  export interface SSLCommerzConfig {
    store_id: string;
    store_passwd: string;
    is_live: boolean;
  }

  export class SSLCommerzPayment {
    constructor(config: SSLCommerzConfig);

    init(
      data: ISslCommerzRequestBody,
      url: boolean = false,
      method: string = "POST"
    ): Promise<SSLCommerzResponse<InitResponse>>;

    validate(data: {
      val_id: string;
    }): Promise<SSLCommerzResponse<TransactionValidationResponse>>;

    initiateRefund(
      data: IRefundRequestBody
    ): Promise<SSLCommerzResponse<RefundResponse>>;
    refundQuery(data: {
      refund_ref_id: string;
    }): Promise<SSLCommerzResponse<QueryRefundResponse>>;

    transactionQueryByTransactionId(data: {
      tran_id: string;
    }): Promise<SSLCommerzResponse<TransactionQueryResponse>>;

    transactionQueryBySessionId(data: {
      sessionkey: string;
    }): Promise<SSLCommerzResponse<TransactionQueryByIdResponse>>;
  }
}
