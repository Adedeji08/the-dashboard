import React from "react";
import Icon from "../../assets/icons";

const Cards = ({ stat }: any) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.all ? stat?.all : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Signed up accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.active ? stat?.active : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Active accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.suspended ? stat?.suspended : 0}{" "}
        </p>
        <span className="text-[14px] font-light pl-3">Suspended accounts</span>
      </section>

      <section className="bg-white rounded-md border border-[#fff]">
        <div className="flex justify-between px-3 py-3">
          <Icon name="personIcon" />
          <Icon name="arrowForward" />
        </div>
        <p className="font-bold text-[24px] pl-3">
          {stat?.locked ? stat?.locked : 0}
        </p>
        <span className="text-[14px] font-light pl-3">Locked accounts</span>
      </section>
    </div>
  );
};

export default Cards;
