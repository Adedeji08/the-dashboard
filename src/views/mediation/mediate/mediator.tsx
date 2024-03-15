import React from 'react'
import { MediationCards } from '../../../components/cards/mediation-cards'
import MediationTable from '../mediation-table'

const Mediator = ({
    statistics,
    data,
    selectedStatus,
    handleStatusChange,
    currentPage,
    handlePageChange,
}: any) => {
  return (
    <div>
        <MediationCards statistics={statistics} />
        <MediationTable 
         data={data}
         selectedStatus={selectedStatus}
         handleStatusChange={handleStatusChange}
         currentPage={currentPage}
         onPageChange={handlePageChange}
        />
    </div>
  )
}

export default Mediator