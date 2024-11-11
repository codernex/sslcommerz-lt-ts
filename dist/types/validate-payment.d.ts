export interface ValidatePaymentData {
    val_id: string;
}
export interface ValidatePaymentResponse {
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
//# sourceMappingURL=validate-payment.d.ts.map