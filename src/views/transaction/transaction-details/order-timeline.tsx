import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

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

type TimelineStep = {
  status: string;
  value: boolean;
};

const OrderTimeline: React.FC<DetailsProps> = ({ transactions }) => {
  const [timeline, setTimeline] = useState<TimelineStep[]>([]);
  const { makeRequest: getTimelines } = useRequest(
    `/orders/${transactions?.order?.orderId}/timeline`,
    "GET"
  );
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

  useEffect(() => {
    const fetchData = async () => {
      if (transactions?.order?.orderId) {
        const [response] = await getTimelines();
        setTimeline(response.data?.timeline || []);
      }
    };

    fetchData();
  }, [transactions?.order?.orderId]);

  return (
    <>
      <div className="w-full">
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

        {/* Timeline */}
        <div className=" bg-white border border-[#fff] mt-10 pt-5 rounded-lg w-full">
          <div className="flex justify-between h-96 mx-8 gap-12">
            {transactions && (
              <section className="flex items-center ">
                <div className="w-[2px]  bg-[#0979A1]">
                  {timeline.map((step: TimelineStep, index) => (
                    <div key={index} className="flex  mb-12">
                      {" "}
                      <div className="flex flex-col items-center mx-4 ml-[-10px] h-full">
                        <div
                          className={classNames("w-6", "h-6", "rounded-full", {
                            "bg-[#0979A1]": step.value,
                            "bg-[#D9D9D9]": !step.value,
                          })}
                        >
                          {step.value && (
                            <FaCheck className="text-white w-4 h-4 mx-auto my-auto pt-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Second path */}
            <section>
              {" "}
              <p className="lg:text-[14px] text-[14px] font-semibold h-14 mt-11">
                {" "}
                Order Received/Link Generated <br />{" "}
                <span className="text-[12px] font-light">
                  {" "}
                  Merchant generated a payment link{" "}
                </span>{" "}
              </p>
              <p className="lg:text-[14px] text-[14px] font-semibold h-14  lg:mt-6 md:mt-6 mt-4">
                {" "}
                Payment Received <br />{" "}
                <span className="text-[12px] font-light">
                  {" "}
                  Payment received from Buyer{" "}
                </span>{" "}
              </p>
              <p className="text-[15px] font-semibold h-14 lg:mt-3 md:mt-6 mt-3">
                {" "}
                Completed <br />{" "}
                <span className="text-[12px] font-light">
                  {" "}
                  Buyer provides release code/merchant uploads proof of delivery{" "}
                </span>
              </p>
              <p className="lg:text-[14px] text-[14px] font-semibold lg:mt-3 md:mt-0 mt-6">
                {" "}
                Payment Disbursed
                <br />{" "}
                <span className="text-[12px] font-light">
                  {" "}
                  Payment disbursed to merchant{" "}
                </span>{" "}
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTimeline;
