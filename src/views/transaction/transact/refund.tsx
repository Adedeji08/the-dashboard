import React from 'react'
import TransactionTable from '../transaction-table'
import { TransactionCards } from '../../../components/cards/cards'

const Refund = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <TransactionCards />
        <TransactionTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Refund