export * from './payment-init';
export * from './refund';
export * from './transaction-query';
export * from './validate-payment';

export interface PaymentMethod {
  name: string;
  type: string;
  logo: string;
  gw: string;
  r_flag?: string; // Optional as not all methods have r_flag
  redirectGatewayURL: string;
}

export interface IRefundRequestBody {
  refund_amount: number;
  refund_remarks: string;
  bank_tran_id: string;
  refe_id: string;
}

export type SSLCommerzResponse<T> = {
  [K in keyof T]?: T[K];
};
