import React from 'react'
import Icon from "../../assets/icons";

interface Stat {
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  pendingPayoutsp: number;
}

interface TransactionCardsProps {
  stat: Stat;
}

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

export const TransactionCards = ({stat}: TransactionCardsProps) => {
  console.log('stat', stat)
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <TransactionCard
        title="Total transactions"
        icon="transact"
        value={stat?.totalTransactions ? stat?.totalTransactions : 0}
      />
      <TransactionCard
        title="Pending transactions"
        icon="transact"
        value={stat?.pendingTransactions ? stat?.pendingTransactions : 0}
      />
      <TransactionCard
        title="Completed transactions"
        icon="transact"
        value={stat?.completedTransactions ? stat?.completedTransactions : 0}
      />
      <TransactionCard
        title="Pending payouts"
        icon="transact"
        value={stat?.pendingPayoutsp ? stat?.pendingPayoutsp : 0}
      />
    </div>
  )
}
