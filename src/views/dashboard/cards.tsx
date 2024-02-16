import React from "react";
import Icon from "../../assets/icons";

const Cards = () => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">450 </p>
        <span className="text-[14px] font-light pl-3">Signed up accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">350 </p>
        <span className="text-[14px] font-light pl-3">Active accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">50 </p>
        <span className="text-[14px] font-light pl-3">Suspended accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">10 </p>
        <span className="text-[14px] font-light pl-3">Locked accounts</span>
      </section>
    </div>
  );
};

export default Cards;
