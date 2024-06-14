import React from "react";
import Icon from "../../assets/icons";
import RefundTable from "./refund-table";

const Refund = () => {
  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
          Refund Requests{" "}
            <p className="text-[14px] font-normal">See all Refunds Requests from Buyers</p>
          </h2>
        </section>

        <section className="flex gap-4">
          <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
            <Icon name="searchIcon" className="mt-3 rounded" />
            <input
              className="outline-none border-none w-[80%] bg-transparent"
              id="input-placeholder"
              placeholder="Search for name"
            />
          </div>
          <Icon name="downloadIcon" />
          <Icon name="notificationIcon" />
        </section>
      </div>

      <RefundTable />
    </>
  );
};

export default Refund;
