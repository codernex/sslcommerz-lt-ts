// src/api/fetch.ts
import fetch from "node-fetch";
var httpCall = async ({
  method = "POST",
  data = {},
  url
}) => {
  try {
    const res = await fetch(url, {
      method,
      /// no-cors, cors, *same-origin
      redirect: "follow",
      // manual, *follow, error
      referrer: "no-referrer",
      // no-referrer, *client
      body: JSON.stringify(data)
      // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

// src/api/payment-init-data-process.ts
import FormData from "form-data";
var paymentInitDataProcess = (data) => {
  let postData = {};
  postData["store_id"] = data.store_id;
  postData["store_passwd"] = data.store_passwd;
  postData["productcategory"] = data.productcategory;
  postData["tran_id"] = data.tran_id;
  postData["total_amount"] = data.total_amount;
  postData["currency"] = data.currency;
  postData["success_url"] = data.success_url;
  postData["fail_url"] = data.fail_url;
  postData["cancel_url"] = data.cancel_url;
  postData["ipn_url"] = data.ipn_url || "";
  postData["multi_card_name"] = data.multi_card_name || "";
  postData["allowed_bin"] = data.allowed_bin || "";
  postData["emi_option"] = data.emi_option;
  postData["emi_max_inst_option"] = data.emi_max_inst_option || "";
  postData["emi_selected_inst"] = data.emi_selected_inst || "";
  postData["cus_name"] = data.cus_name;
  postData["cus_email"] = data.cus_email;
  postData["cus_add1"] = data.cus_add1;
  postData["cus_add2"] = data.cus_add2;
  postData["cus_city"] = data.cus_city;
  postData["cus_state"] = data.cus_state;
  postData["cus_postcode"] = data.cus_postcode;
  postData["cus_country"] = data.cus_country;
  postData["cus_phone"] = data.cus_phone;
  postData["cus_fax"] = data.cus_fax || "";
  postData["shipping_method"] = data.shipping_method;
  postData["num_of_item"] = data.num_of_item;
  postData["ship_name"] = data.ship_name || "";
  postData["shipcity"] = data.shipcity || "";
  postData["ship_add1"] = data.ship_add1 || "";
  postData["ship_add2"] = data.ship_add2 || "";
  postData["ship_city"] = data.ship_city || "";
  postData["ship_state"] = data.ship_state || "";
  postData["ship_postcode"] = data.ship_postcode || "";
  postData["ship_country"] = data.ship_country || "";
  postData["product_name"] = data.product_name;
  postData["product_category"] = data.product_category;
  postData["product_profile"] = data.product_profile;
  postData["hours_till_departure"] = data.hours_till_departure || "";
  postData["flight_type"] = data.flight_type || "";
  postData["pnr"] = data.pnr || "";
  postData["journey_from_to"] = data.journey_from_to || "";
  postData["third_party_booking"] = data.third_party_booking || "";
  postData["hotel_name"] = data.hotel_name || "";
  postData["length_of_stay"] = data.length_of_stay || "";
  postData["check_in_time"] = data.check_in_time || "";
  postData["hotel_city"] = data.hotel_city || "";
  postData["product_type"] = data.product_type || "";
  postData["topup_number"] = data.topup_number || "";
  postData["country_topup"] = data.country_topup || "";
  postData["cart"] = data.cart || "";
  postData["product_amount"] = data.product_amount || "";
  postData["discount_amount"] = data.discount_amount || "";
  postData["convenience_fee"] = data.convenience_fee || "";
  postData["value_a"] = data.value_a || "";
  postData["value_b"] = data.value_b || "";
  postData["value_c"] = data.value_c || "";
  postData["value_d"] = data.value_d || "";
  const fdata = new FormData();
  for (const key in postData) {
    if (Object.prototype.hasOwnProperty.call(postData, key)) {
      fdata.append(key, postData[key] || "");
    }
  }
  return fdata;
};

// src/api/payment-controller.ts
var SSLCommerzPayment = class _SSLCommerzPayment {
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
    this.baseURL = `https://${live ? "securepay" : "sandbox"}.sslcommerz.com`;
    this.store_id = store_id;
    this.store_passwd = store_passwd;
    this.initURL = this.buildURL("/gwprocess/v4/api.php");
    this.validationURL = this.buildURL(
      "/validator/api/validationserverAPI.php?"
    );
    this.refundURL = this.buildURL(
      "/validator/api/merchantTransIDvalidationAPI.php?"
    );
    this.refundQueryURL = this.buildURL(
      "/validator/api/merchantTransIDvalidationAPI.php?"
    );
    this.transactionQueryBySessionIdURL = this.buildURL(
      "/validator/api/merchantTransIDvalidationAPI.php?"
    );
    this.transactionQueryByTransactionIdURL = this.buildURL(
      "/validator/api/merchantTransIDvalidationAPI.php?"
    );
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
    if (!_SSLCommerzPayment.instance) {
      _SSLCommerzPayment.instance = new _SSLCommerzPayment(
        store_id,
        store_passwd,
        live
      );
    }
    return _SSLCommerzPayment.instance;
  }
  init(data, url = false, method = "POST") {
    data.store_id = this.store_id;
    data.store_passwd = this.store_passwd;
    return httpCall({
      url: url ? this.initURL : "",
      method: method || "POST",
      data: paymentInitDataProcess(data)
    });
  }
  validate(data, url = false, method = "GET") {
    return httpCall({
      url: url ? this.validationURL : `val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
      method
    });
  }
  initiateRefund(data, url = false, method = "GET") {
    return httpCall({
      url: url ? this.refundURL : `refund_amount=${data.refund_amount}&refund_remarks=${data.refund_remarks}&bank_tran_id=${data.bank_tran_id}&refe_id=${data.refe_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
      method
    });
  }
  refundQuery(data, url = false, method = "GET") {
    return httpCall({
      url: url ? this.refundQueryURL : `refund_ref_id=${data.refund_ref_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
      method
    });
  }
  transactionQueryBySessionId(data, url = false, method = "GET") {
    return httpCall({
      url: url ? this.transactionQueryBySessionIdURL : `sessionkey=${data.sessionkey}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
      method
    });
  }
  transactionQueryByTransactionId(data, url = false, method = "GET") {
    return httpCall({
      url: url ? this.transactionQueryByTransactionIdURL : `tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
      method
    });
  }
};
export {
  SSLCommerzPayment
};
