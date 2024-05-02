import React from 'react'
import SupportTable from '../support-table'
import { SupportCards } from '../../../components/cards/support.card'

const Requests = ({
    data,
    statistics,
    selectedStatus,
    handleStatusChange,
    currentPage,
    handlePageChange,
}: any) => {
  return (
    <div>
      <SupportCards statistics={statistics} />
      <SupportTable
        data={data}
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Requests