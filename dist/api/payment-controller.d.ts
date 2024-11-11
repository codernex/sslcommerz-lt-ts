import type { InitateRefundBody, InitiateRefundRespone, QueryRefundResponse, TransactionQueryResponse, ValidatePaymentData, ValidatePaymentResponse, PaymentInitData, PaymentInitResponse } from '../types/index.js';
import { type RequestMethod } from './fetch.js';
export declare class SSLCommerzPayment {
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
//# sourceMappingURL=payment-controller.d.ts.map