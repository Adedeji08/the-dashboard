import React from 'react'
import Icon from "../../assets/icons";

const TransactionCard = ({ title, icon, value }: any) => {
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

export const TransactionCards = ({stat}: any) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <TransactionCard
        title="Total transactions"
        icon="transact"
        value={stat?.all ? stat?.all : 0}
      />
      <TransactionCard
        title="Pending transactions"
        icon="transact"
        value={stat?.active ? stat?.active : 0}
      />
      <TransactionCard
        title="Completed transactions"
        icon="transact"
        value={stat?.suspended ? stat?.suspended : 0}
      />
      <TransactionCard
        title="Pending payouts"
        icon="transact"
        value={stat?.locked ? stat?.locked : 0}
      />
    </div>
  )
}
