import React from 'react'
import Icon from "../../assets/icons";

interface Statistics {
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  pendingPayoutsp: number;
}

interface TransactionCardsProps {
  statistics: Statistics;
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

export const TransactionCards = ({statistics}: TransactionCardsProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8 mt-7 w-[95%] ">
      <TransactionCard
        title="Total transactions"
        icon="transact"
        value={statistics?.totalTransactions ? statistics?.totalTransactions : 0}
      />
      <TransactionCard
        title="Pending transactions"
        icon="transact"
        value={statistics?.pendingTransactions ? statistics?.pendingTransactions : 0}
      />
      <TransactionCard
        title="Completed transactions"
        icon="transact"
        value={statistics?.completedTransactions ? statistics?.completedTransactions : 0}
      />
      <TransactionCard
        title="Pending payouts"
        icon="transact"
        value={statistics?.pendingPayoutsp ? statistics?.pendingPayoutsp : 0}
      />
    </div>
  )
}
