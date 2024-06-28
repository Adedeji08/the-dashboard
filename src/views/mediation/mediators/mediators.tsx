import React from 'react'
import MediatorTable from '../mediator-table'

const MediatorList = ({
    data,
    currentPage,
    handlePageChange,
}: any) => {
  return (
    <div>
      <MediatorTable
        data={data}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default MediatorList