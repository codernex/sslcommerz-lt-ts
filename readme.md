# [SSLCommerz LTS Ts](https://github.com/codernex/sslcommerz-lt-ts)

### Why Use This Package Instead of the Original JavaScript Version?

If you're a TypeScript developer and find it challenging to navigate the documentation to understand the required parameters for each method, or to determine what kind of response data you’ll receive from the methods, then this package is for you.

I attempted to reach out to the SSLCommerz development team to inquire about adding TypeScript support for their original package, but unfortunately, I didn't receive a response.

As a TypeScript developer, it's frustrating to use a plain JavaScript package in a TypeScript project. It's especially tedious to create local type definitions every time I need to use the sslcommerz-lts package. That’s why I decided to create this TypeScript-enabled package to make integration smoother and more efficient.

#### **This version follows Singleton Pattern, Means you can only initialize the SSLCommerz class at once which provides consistency**

### This is a typescript supported version of the Original [SSLCommerz - Node.js Library](https://www.npmjs.com/package/sslcommerz-lts)

### [SSLCommerz - Node.js Library](https://www.npmjs.com/package/sslcommerz-lts)

LTS package, Officially supported by SSLCommerz Integration Team.

## Installation

```bash
npm i sslcommerz-lts-ts

```

## How to use:

### Initialize a Transaction

```ts
import express from 'express';
import { SSLCommerzPayment } from 'sslcommerz-lts-ts';

const store_id = '<your_store_id>';
const store_passwd = '<your_store_password>';
const is_live = false; //true for live, false for sandbox

const port = 3030;

/**
 * This Follows Singleton Pattern
 */
const sslcz = SSLCommerzPayment.initialize(store_id, store_passwd, is_live);

//sslcommerz init
app.get('/init', (req, res) => {
  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF123', // use unique tran_id for each api call
    success_url: 'http://localhost:3030/success',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log('Redirecting to: ', GatewayPageURL);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### Validate after successful transaction (inside success and ipn controller methods)

```js
//sslcommerz validation

app.get('/validate', (req, res) => {
  const data = {
    val_id: ADGAHHGDAKJ456454, //that you go from sslcommerz response
  };
  sslcz.validate(data).then((data) => {
    //process the response that got from sslcommerz
    // https://developer.sslcommerz.com/doc/v4/#order-validation-api
  });
});
```

### To initiate a refund through API

```js
//SSLCommerz initiateRefund

app.get('/initiate-refund', (req, res) => {
  const data = {
    refund_amount: 10,
    refund_remarks: '',
    bank_tran_id: CB5464321445456456,
    refe_id: EASY5645415455,
  };
  sslcz.initiateRefund(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
  });
});
```

### Query the status of a refund request

```js
//SSLCommerz refundQuery

app.get('/refund-query', (req, res) => {
  const data = {
    refund_ref_id: SL4561445410,
  };

  sslcz.refundQuery(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
  });
});
```

### Query the status of a transaction (by Transaction ID)

```js
//SSLCommerz transactionQueryByTransactionId
//you also use this as internal method
app.get('/transaction-query-by-transaction-id', (req, res) => {
  const data = {
    tran_id: AKHLAKJS5456454,
  };
  sslcz.transactionQueryByTransactionId(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#by-session-id
  });
});
```

### Query the status of a transaction (by session ID)

```js
//SSLCommerz transactionQueryBySessionId
//you also use this as internal method
app.get('/transaction-query-by-session-id', (req, res) => {
  const data = {
    sessionkey: AKHLAKJS5456454,
  };
  sslcz.transactionQueryBySessionId(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#by-session-id
  });
});
```

- Find more details in [SSLCommerz Developer's Guide](https://developer.sslcommerz.com/)
- For any technical queries: integration@sslcommerz.com

- If You Like this initiative feel free to give an star to the Repository
