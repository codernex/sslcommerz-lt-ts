import { httpCall } from './fetch.js';
import { paymentInitDataProcess } from './payment-init-data-process.js';
export class SSLCommerzPayment {
    baseURL;
    initURL;
    validationURL;
    refundURL;
    refundQueryURL;
    transactionQueryBySessionIdURL;
    transactionQueryByTransactionIdURL;
    store_id;
    store_passwd;
    // Singleton instance
    static instance;
    /**
     * Constructor for SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     */
    constructor(store_id, store_passwd, live = false) {
        this.baseURL = `https://${live ? 'securepay' : 'sandbox'}.sslcommerz.com`;
        this.store_id = store_id;
        this.store_passwd = store_passwd;
        // Using helper function to construct URLs
        this.initURL = this.buildURL('/gwprocess/v4/api.php');
        this.validationURL = this.buildURL('/validator/api/validationserverAPI.php?');
        this.refundURL = this.buildURL('/validator/api/merchantTransIDvalidationAPI.php?');
        this.refundQueryURL = this.buildURL('/validator/api/merchantTransIDvalidationAPI.php?');
        this.transactionQueryBySessionIdURL = this.buildURL('/validator/api/merchantTransIDvalidationAPI.php?');
        this.transactionQueryByTransactionIdURL = this.buildURL('/validator/api/merchantTransIDvalidationAPI.php?');
    }
    buildURL(endpoint) {
        return `${this.baseURL}${endpoint}`;
    }
    /**
     * Initializes the singleton instance of the SslCommerzPayment class.
     * @param {string} store_id - SSL Commerz Store ID
     * @param {string} store_passwd - SSL Commerz Store Password
     * @param {boolean} live - Set to true for Live Mode, false for Sandbox Mode (default is false).
     * @returns {SSLCommerzPayment} - The singleton instance of SslCommerzPayment.
     */
    static initialize(store_id, store_passwd, live = false) {
        if (!SSLCommerzPayment.instance) {
            SSLCommerzPayment.instance = new SSLCommerzPayment(store_id, store_passwd, live);
        }
        return SSLCommerzPayment.instance;
    }
    init(data, url = false, method = 'POST') {
        data.store_id = this.store_id;
        data.store_passwd = this.store_passwd;
        return httpCall({
            url: url ? this.initURL : '',
            method: method || 'POST',
            data: paymentInitDataProcess(data),
        });
    }
    validate(data, url = false, method = 'GET') {
        return httpCall({
            url: url
                ? this.validationURL
                : '' +
                    `val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
    initiateRefund(data, url = false, method = 'GET') {
        return httpCall({
            url: url
                ? this.refundURL
                : '' +
                    `refund_amount=${data.refund_amount}&refund_remarks=${data.refund_remarks}&bank_tran_id=${data.bank_tran_id}&refe_id=${data.refe_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
    refundQuery(data, url = false, method = 'GET') {
        return httpCall({
            url: url
                ? this.refundQueryURL
                : '' +
                    `refund_ref_id=${data.refund_ref_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
    transactionQueryBySessionId(data, url = false, method = 'GET') {
        return httpCall({
            url: url
                ? this.transactionQueryBySessionIdURL
                : '' +
                    `sessionkey=${data.sessionkey}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
    transactionQueryByTransactionId(data, url = false, method = 'GET') {
        return httpCall({
            url: url
                ? this.transactionQueryByTransactionIdURL
                : '' +
                    `tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method,
        });
    }
}
//# sourceMappingURL=payment-controller.js.map