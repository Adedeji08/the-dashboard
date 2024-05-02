import React from 'react'
import Icon from "../../assets/icons";

interface Statistics {
  all: number;
  active: number;
  resolved: number;
  closed: number;
}

interface AccountCardsProps {
  statistics: Statistics;
}

const SupportCard = ({ title, icon, value }: any) => {
  return (
    <section className="bg-white rounded-md border border-[#fff]">
      <div className="flex justify-between px-3 py-3">
        <Icon name={icon} />
      </div>
      <p className="font-bold text-[24px] pl-3">{value}</p>
      <span className="text-[14px] font-light pl-3">{title}</span>
    </section>
  )
}

export const SupportCards = ({statistics}: AccountCardsProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <SupportCard
        title="All requests"
        icon="personIcon"
        value={statistics?.all || 0}
      />
      <SupportCard
        title="Completed requests"
        icon="personIcon"
        value={statistics?.resolved || 0}
      />
      <SupportCard
        title="Active requests"
        icon="personIcon"
        value={statistics?.active || 0}
      />
      <SupportCard
        title="Cancelled requests"
        icon="personIcon"
        value={statistics?.closed || 0}
      />
    </div>
  )
}