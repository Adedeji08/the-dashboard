import React from 'react'
import TransactionTable from '../transaction-table'
import TransactionCards from '../../../components/cards/transaction-cards'

const Payments = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <TransactionCards />
        <TransactionTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Payments