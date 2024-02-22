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

const Details = ({ title, value }: any) => {
  return (
    <div className="flex justify-between px-4 mt-3">
      <h3 className="font-normal text-[14px]">{title}</h3>
      <h3 className="font-medium text-[14px] pt-1">{value}</h3>
    </div>
  );
};

const OrderDetails: React.FC<DetailsProps> = ({ transactions }) => {
  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full">
      <div className="px-4">
        <h3 className="font-semibold text-[14px]">Merchant’s Details</h3>
      </div>

      <Details
        title="Name:"
        value={
          transactions?.order?.merchantName
            ? transactions?.order?.merchantName
            : "N/A"
        }
      />

      <Details
        title="Business Name:"
        value={transactions?.order?.merchantBusinessName}
      />

      <Details
        title="Business phone number:"
        value={transactions?.order?.merchantPhoneNumber}
      />

      <Details
        title="Business email address:"
        value={transactions?.order?.merchantEmail}
      />

      <Details
        title="Social media platform:"
        value={
          transactions?.order?.socialMediaPlatform
            ? transactions?.order?.socialMediaPlatform
            : "N/A"
        }
      />

      <Details
        title="Social media handle:"
        value={
          transactions?.order?.merchantSocialMediaHandle
            ? transactions?.order?.merchantSocialMediaHandle
            : "N/A"
        }
      />

      <div className="px-4 mt-5">
        <h3 className="font-semibold text-[14px]">Buyer’s Details</h3>
      </div>

      <Details title="Name:" value={transactions?.order?.buyerName} />

      <Details
        title="Phone number:"
        value={transactions?.order?.buyerPhoneNumber}
      />

      <Details title="Email address:" value={transactions?.order?.buyerEmail} />

      <Details
        title="Social media platform:"
        value={
          transactions?.order?.socialMediaPlatform
            ? transactions?.order?.socialMediaPlatform
            : "N/A"
        }
      />

      <Details
        title="Social media handle:"
        value={
          transactions?.order?.buyerSocialMediaHandle
            ? transactions?.order?.buyerSocialMediaHandle
            : "N/A"
        }
      />

      <Details title="Amount:" value={transactions?.amount} />
    </div>
  );
};

export default OrderDetails;
