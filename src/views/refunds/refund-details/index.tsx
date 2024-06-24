import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Details from "./details";

export interface Item {
    name: string;
    amount: number;
    currency: string;
    quantity: number;
    description: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Order {
    id: string;
    orderId: string;
    merchantName: string | null;
    merchantBusinessName: string;
    merchantPhoneNumber: string;
    merchantEmail: string;
    merchantSocialMediaHandle: string;
    merchantSocialMediaPlatform: string | null;
    socialMediaPlatform: string | null;
    buyerName: string;
    buyerPhoneNumber: string;
    buyerEmail: string;
    buyerSocialMediaHandle: string | null;
    buyerSocialMediaPlatform: string | null;
    createdBy: string;
    status: string;
    code: string;
    promo: string | null;
    transactionFee: number;
    created_at: string;
    updated_at: string;
    items: Item[];
  }
  
  export interface Refund {
    id: string;
    orderId: string;
    reason: string;
    note: string;
    proof: string[];
    status: string;
    approvedBy: string | null;
    approvedAt: string | null;
    rejectedBy: string | null;
    rejectedAt: string | null;
    created_at: string;
    updated_at: string;
    order: Order & { buyerSocialMediaHandle: string }; 
  }
  

const RefundDetails = () => {
  const [refund, setRefund] = useState<Refund | null>(null);
  const { id } = useParams<{ id: string }>();
  const { makeRequest: getRefundById } = useRequest(`/orders/refunds/${id}`, "GET");

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getRefundById();
      setRefund(response?.data || null);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Requests/Order ID {refund?.orderId}</h2>
      </div>
      <Details refund={refund} />
    </>
  );
};

export default RefundDetails;
