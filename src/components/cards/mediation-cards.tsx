import React from 'react'
import Icon from "../../assets/icons";

interface Statistics {
  all: number;
  completed: number;
  active: number;
  cancelled: number;
}

interface AccountCardsProps {
  statistics: Statistics;
}

const MediationCard = ({ title, icon, value }: any) => {
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

export const MediationCards = ({statistics}: AccountCardsProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <MediationCard
        title="All requests"
        icon="mediate"
        value={statistics?.all || 0}
      />
      <MediationCard
        title="Completed requests"
        icon="mediate"
        value={statistics?.completed || 0}
      />
      <MediationCard
        title="Active requests"
        icon="mediate"
        value={statistics?.active || 0}
      />
      <MediationCard
        title="Cancelled requests"
        icon="mediate"
        value={statistics?.cancelled || 0}
      />
    </div>
  )
}