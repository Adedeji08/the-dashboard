import React from 'react'
import Icon from "../../assets/icons";

interface Statistics {
  all: number;
  active: number;
  suspended: number;
  locked: number;
}

interface AccountCardsProps {
  statistics: Statistics;
}

const AccountCard = ({ title, icon, value }: any) => {
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

export const AccountCards = ({statistics}: AccountCardsProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <AccountCard
        title="Signed up accounts"
        icon="personIcon"
        value={statistics?.all || 0}
      />
      <AccountCard
        title="Active accounts"
        icon="personIcon"
        value={statistics?.active || 0}
      />
      <AccountCard
        title="Suspended accounts"
        icon="personIcon"
        value={statistics?.suspended || 0}
      />
      <AccountCard
        title="Blocked accounts"
        icon="personIcon"
        value={statistics?.locked || 0}
      />
    </div>
  )
}