import React from 'react'
import Icon from "../../assets/icons";

const AccountCard = ({ title, icon, value }: any) => {
  return (
    <section className="bg-white rounded-md border border-[#fff]">
      <div className="flex justify-between px-3 py-3">
        <Icon name={icon} />
        <Icon name="arrowForward" />
      </div>
      <p className="font-bold text-[24px] pl-3">{value}</p>
      <span className="text-[14px] font-light pl-3">{title}</span>
    </section>
  )
}

export const AccountCards = ({stat}: any) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <AccountCard
        title="Signed up accounts"
        icon="personIcon"
        value={stat?.all ? stat?.all : 0}
      />
      <AccountCard
        title="Active accounts"
        icon="personIcon"
        value={stat?.active ? stat?.active : 0}
      />
      <AccountCard
        title="Suspended accounts"
        icon="personIcon"
        value={stat?.suspended ? stat?.suspended : 0}
      />
      <AccountCard
        title="Locked accounts"
        icon="personIcon"
        value={stat?.locked ? stat?.locked : 0}
      />
    </div>
  )
}