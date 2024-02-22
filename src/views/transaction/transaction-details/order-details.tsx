import React from "react";

interface DetailsProps {
  transactions: {
    id: string;
    amount: number;
    type: string;
    status: string;
    created_at: string;
    order: {
      id: string;
      orderId: string;
      merchantName: string | null;
      merchantBusinessName: string | null;
      merchantPhoneNumber: string | null;
      merchantEmail: string | null;
      merchantSocialMediaHandle: string | null;
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
      created_at: string;
      updated_at: string;
    };
  };
}

const OrderDetails: React.FC<DetailsProps> = ({ transactions }) => {
  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full">
      <div className="px-4">
        <h3 className="font-semibold text-[14px]">Merchant’s Details</h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Name:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.merchantName ? transactions?.order?.merchantName : 'N/A'}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Business Name:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.merchantBusinessName}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Business phone number:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.merchantPhoneNumber}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Business email address:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.merchantEmail}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Social media platform:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.socialMediaPlatform ? transactions?.order?.socialMediaPlatform : 'N/A'}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Social media handle:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.merchantSocialMediaHandle ? transactions?.order?.merchantSocialMediaHandle: 'N/A'}
        </h3>
      </div>


      <div className="px-4 mt-5">
        <h3 className="font-semibold text-[14px]">Buyer’s Details</h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Name:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.buyerName}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Phone number:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.buyerPhoneNumber}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Email address:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.buyerEmail}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Social media platform:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.socialMediaPlatform ? transactions?.order?.socialMediaPlatform : 'N/A'}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Social media handle:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.order?.buyerSocialMediaHandle ? transactions?.order?.buyerSocialMediaHandle : 'N/A'}
        </h3>
      </div>

      <div className="flex justify-between px-4 mt-3">
        <h3 className="font-normal text-[14px]">Amount:</h3>
        <h3 className="font-medium text-[14px] pt-1">
          {transactions?.amount}
        </h3>
      </div>


    </div>
  );
};

export default OrderDetails;
