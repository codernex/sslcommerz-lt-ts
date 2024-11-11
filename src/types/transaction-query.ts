export interface TransactionQueryResponse {
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

export interface TransactionQueryByIdResponse {
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
