import React from 'react'
import TransactionTable from '../transaction-table'
import { TransactionCards } from '../../../components/cards/transaction-card'

const Withdrawal = ({data, statistics, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <TransactionCards statistics={statistics} />
        <TransactionTable data={data}  selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Withdrawal