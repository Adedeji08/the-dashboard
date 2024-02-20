import React from 'react'
import Cards from '../cards'
import TransactionTable from '../transaction-table'

const Withdrawal = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <Cards />
        <TransactionTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Withdrawal