import React from 'react'
import TransactionTable from '../transaction-table'
import { TransactionCards } from '../../../components/cards/transaction-card'

const Refund = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <TransactionCards stat={stat} />
        <TransactionTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Refund