export interface InitateRefundBody {
    refund_amount: number;
    refund_remarks: string;
    bank_tran_id: string;
    refe_id: string;
}
export interface InitiateRefundRespone {
    APIConnect: string;
    bank_tran_id: string;
    trans_id: string;
    refund_ref_id: string;
    status: string;
    errorReason: string;
}
export interface QueryRefundResponse {
    APIConnect: string;
    bank_tran_id: string;
    tran_id: string;
    initiated_on: string;
    refunded_on: string;
    status: "refunded" | "processing" | "cancelled";
    refund_ref_id: string;
}
//# sourceMappingURL=refund.d.ts.map