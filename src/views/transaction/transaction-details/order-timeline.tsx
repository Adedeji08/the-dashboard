import React from "react";
import Button from "../../../components/button";

interface DetailsProps {
  transactions: {
    id: string;
    order: {
      id: string;
      orderId: string;
      status: string;
    };
  };
}

const OrderTimeline: React.FC<DetailsProps> = ({ transactions }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#D1FFC9";
      case "pending":
        return "#FCCFCF";
      case "paid":
        return "#D1FFC9";
      case "cancelled":
        return "#FCCFCF";
      case "disputed":
        return "#FCCFCF";
      default:
        return "transparent";
    }
  };

  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-5 rounded-lg w-full h-64">
      <div className="flex justify-between px-4">
        <h3 className="font-semibold text-[18px]">OrderID</h3>
        <h3 className="font-semibold text-[18px] pt-1">
          {transactions?.order?.orderId}
        </h3>
      </div>

      <div className="flex justify-between px-4">
        <h3 className="font-semibold text-[18px]">Status</h3>
        <h3
          className="font-semibold text-[12px] mt-1 text-center w-20 h-4 rounded-md"
          style={{
            backgroundColor: getStatusColor(transactions?.order?.status),
          }}
        >
          {transactions?.order?.status}
        </h3>
      </div>

      <div className="flex gap-8 justify-center items-center mt-5 px-4">
        <Button size="lg" variant="secondary" type="submit">
          Cancel transaction
        </Button>
      </div>

      <div className="flex gap-8 justify-center items-center mt-5 px-4">
        <Button size="lg" variant="secondary" type="button">
          Payment request
        </Button>
      </div>
    </div>
  );
};

export default OrderTimeline;
