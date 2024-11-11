interface PaymentInitData {
    store_id?: string;
    store_passwd?: string;
    productcategory: string;
    tran_id: string;
    total_amount: number;
    currency: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url?: string;
    multi_card_name?: string;
    allowed_bin?: string;
    emi_option: number;
    emi_max_inst_option?: string;
    emi_selected_inst?: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_add2: string;
    cus_city: string;
    cus_state: string;
    cus_postcode: string;
    cus_country: string;
    cus_phone: string;
    cus_fax?: string;
    shipping_method: string;
    num_of_item: string;
    ship_name?: string;
    shipcity?: string;
    ship_add1?: string;
    ship_add2?: string;
    ship_city?: string;
    ship_state?: string;
    ship_postcode?: string;
    ship_country?: string;
    product_name: string;
    product_category: string;
    product_profile: string;
    hours_till_departure?: string;
    flight_type?: string;
    pnr?: string;
    journey_from_to?: string;
    third_party_booking?: string;
    hotel_name?: string;
    length_of_stay?: string;
    check_in_time?: string;
    hotel_city?: string;
    product_type?: string;
    topup_number?: string;
    country_topup?: string;
    cart?: string;
    product_amount?: string;
    discount_amount?: string;
    convenience_fee?: string;
    value_a?: string;
    value_b?: string;
    value_c?: string;
    value_d?: string;
}
interface PaymentMethod {
    name: string;
    type: string;
    logo: string;
    gw: string;
    r_flag?: string;
    redirectGatewayURL: string;
}
interface PaymentInitResponse {
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

interface InitateRefundBody {
    refund_amount: number;
    refund_remarks: string;
    bank_tran_id: string;
    refe_id: string;
}
interface InitiateRefundRespone {
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
    status: 'refunded' | 'processing' | 'cancelled';
    refund_ref_id: string;
}

interface TransactionQueryResponse {
    status: string;
    sessionkey: string;
    tran_date: string;
    tran_id: string;
    val_id: string;
    amount: string;
    store_amount: string;
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
    risk_title: string;
    risk_level: string;
    APIConnect: string;
    validated_on: string;
    gw_version: string;
}

interface ValidatePaymentData {
    val_id: string;
}
interface ValidatePaymentResponse {
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

type RequestMethod = 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'GET';

declare class SSLCommerzPayment {
    private readonly baseURL;
    private readonly initURL;
    private readonly validationURL;
    private readonly refundURL;
    private readonly refundQueryURL;
    private readonly transactionQueryBySessionIdURL;
    private readonly transactionQueryByTransactionIdURL;
    private readonly store_id;
    private readonly store_passwd;
    private static instance;
    /**
     * Constructor for SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     */
    private constructor();
    private buildURL;
    /**
     * Initializes the singleton instance of the SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     * @returns {SSLCommerzPayment} - The singleton instance of SslCommerzPayment.
     */
    static initialize(store_id: string, store_passwd: string, live?: boolean): SSLCommerzPayment;
    init(data: PaymentInitData, url?: boolean, method?: RequestMethod): Promise<PaymentInitResponse>;
    validate(data: ValidatePaymentData, url?: boolean, method?: RequestMethod): Promise<ValidatePaymentResponse>;
    initiateRefund(data: InitateRefundBody, url?: boolean, method?: RequestMethod): Promise<InitiateRefundRespone>;
    refundQuery(data: {
        refund_ref_id: string;
    }, url?: boolean, method?: RequestMethod): Promise<QueryRefundResponse>;
    transactionQueryBySessionId(data: {
        sessionkey: string;
    }, url?: boolean, method?: RequestMethod): Promise<TransactionQueryResponse>;
    transactionQueryByTransactionId(data: {
        tran_id: string;
    }, url?: boolean, method?: RequestMethod): Promise<TransactionQueryResponse>;
}

export { SSLCommerzPayment };
