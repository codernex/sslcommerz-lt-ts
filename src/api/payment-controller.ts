import {
    InitateRefundBody,
    InitiateRefundRespone,
    QueryRefundResponse,
    TransactionQueryResponse,
    ValidatePaymentData,
    ValidatePaymentResponse,
    PaymentInitData,
    PaymentInitResponse,
} from "../types";
import {httpCall, RequestMethod} from "./fetch";
import {paymentInitDataProcess} from "./payment-init-data-process";

export class SSLCommerzPayment {
    private readonly baseURL: string;
    private readonly initURL: string;
    private readonly validationURL: string;
    private readonly refundURL: string;
    private readonly refundQueryURL: string;
    private readonly transactionQueryBySessionIdURL: string;
    private readonly transactionQueryByTransactionIdURL: string;
    private readonly store_id: string;
    private readonly store_passwd: string;

    // Singleton instance
    private static instance: SSLCommerzPayment;

    /**
     * Constructor for SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     */
    private constructor(store_id: string, store_passwd: string, live: boolean = false) {
        this.baseURL = `https://${live ? "securepay" : "sandbox"}.sslcommerz.com`;
        this.store_id = store_id;
        this.store_passwd = store_passwd;

        // Using helper function to construct URLs
        this.initURL = this.buildURL("/gwprocess/v4/api.php");
        this.validationURL = this.buildURL("/validator/api/validationserverAPI.php?");
        this.refundURL = this.buildURL("/validator/api/merchantTransIDvalidationAPI.php?");
        this.refundQueryURL = this.buildURL("/validator/api/merchantTransIDvalidationAPI.php?");
        this.transactionQueryBySessionIdURL = this.buildURL("/validator/api/merchantTransIDvalidationAPI.php?");
        this.transactionQueryByTransactionIdURL = this.buildURL("/validator/api/merchantTransIDvalidationAPI.php?");
    }
    private buildURL(endpoint: string): string {
        return `${this.baseURL}${endpoint}`;
    }

    /**
     * Initializes the singleton instance of the SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     * @returns {SSLCommerzPayment} - The singleton instance of SslCommerzPayment.
     */
    public static initialize(store_id: string, store_passwd: string, live: boolean = false): SSLCommerzPayment {
        if (!SSLCommerzPayment.instance) {
            SSLCommerzPayment.instance = new SSLCommerzPayment(store_id, store_passwd, live);
        }
        return SSLCommerzPayment.instance;
    }

    init(data: PaymentInitData, url = false, method: RequestMethod = "POST") {
        data.store_id = this.store_id;
        data.store_passwd = this.store_passwd;
        return httpCall<PaymentInitResponse>({
            url: url ? this.initURL : "",
            method: method || "POST",
            data: paymentInitDataProcess(data),
        });
    }

    validate(
        data: ValidatePaymentData,
        url = false,
        method: RequestMethod = "GET"
    ) {
        return httpCall<ValidatePaymentResponse>({
            url: url
                ? this.validationURL
                : "" +
                `val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }

    initiateRefund(
        data: InitateRefundBody,
        url = false,
        method: RequestMethod = "GET"
    ) {
        return httpCall<InitiateRefundRespone>({
            url: url
                ? this.refundURL
                : "" +
                `refund_amount=${data.refund_amount}&refund_remarks=${data.refund_remarks}&bank_tran_id=${data.bank_tran_id}&refe_id=${data.refe_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }

    refundQuery(
        data: {
            refund_ref_id: string;
        },
        url = false,
        method: RequestMethod = "GET"
    ) {
        return httpCall<QueryRefundResponse>({
            url: url
                ? this.refundQueryURL
                : "" +
                `refund_ref_id=${data.refund_ref_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }

    transactionQueryBySessionId(
        data: {
            sessionkey: string;
        },
        url = false,
        method: RequestMethod = "GET"
    ) {
        return httpCall<TransactionQueryResponse>({
            url: url
                ? this.transactionQueryBySessionIdURL
                : "" +
                `sessionkey=${data.sessionkey}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }

    transactionQueryByTransactionId(
        data: {
            tran_id: string;
        },
        url = false,
        method: RequestMethod = "GET"
    ) {
        return httpCall<TransactionQueryResponse>({
            url: url
                ? this.transactionQueryByTransactionIdURL
                : "" +
                `tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
}
