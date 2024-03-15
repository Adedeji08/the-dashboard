import React from 'react'
import { MediationCards } from '../../../components/cards/mediation-cards'
import MediationTable from '../mediation-table'

const Mediator = ({
    statistics,
    // selectedStatus,
    // handleStatusChange,
    // currentPage,
    // handlePageChange,
}: any) => {
  return (
    <div>
        <MediationCards statistics={statistics} />
        <MediationTable 
        />
    </div>
  )
}

export default Mediator