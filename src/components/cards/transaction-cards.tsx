import React from "react";
import Icon from "../../assets/icons";

const TransactionCards = ({ stat }: any) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="transact" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.all ? stat?.all : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Total transactions</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="transact" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.active ? stat?.active : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Pending transactions</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="transact" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.suspended ? stat?.suspended : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Completed transactions</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="transact" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.locked ? stat?.locked : 0}
        </p>
        <span className="text-[14px] font-light pl-3">Pending payouts</span>
      </section>
    </div>
  );
};

export default TransactionCards;
