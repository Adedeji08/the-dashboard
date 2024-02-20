import React from 'react'
import TransactionCard from '../../components/cards/transaction-card'

const TransactionCards = ({stat}: any) => {
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

export default TransactionCards