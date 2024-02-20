import React from 'react'
import Cards from '../cards'
import TransactionTable from '../transaction-table'

const Payments = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
        <Cards />
        <TransactionTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
    </div>
  )
}

export default Payments