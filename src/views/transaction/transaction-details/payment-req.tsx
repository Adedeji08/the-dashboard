import React from "react";
import Back from "../../../components/back";

const PaymentDetails = ({ title, value }: any) => {
  return (
    <div className="flex justify-between mt-3">
      <h3 className="font-normal text-[14px]">{title}</h3>
      <h3 className="font-medium text-[14px] pt-1">{value}</h3>
    </div>
  );
};

const PaymentRequest = () => {
  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Transaction Details</h2>
      </div>
      <div className=" bg-white border border-[#fff] mt-10 pt-14 rounded-lg mr-10">
        <div className="w-[30%] mx-auto">
          <h2 className="text-[18px] font-semibold">Payment request</h2>
          <PaymentDetails title="Name:" value={"N/A"} />

          <PaymentDetails title="Name:" value={"N/A"} />

          <PaymentDetails title="Name:" value={"N/A"} />
        </div>
      </div>
    </>
  );
};

export default PaymentRequest;
