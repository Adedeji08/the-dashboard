import React from 'react'
import AgentTable from '../agent-table'

const Agents = ({
    data,
    currentPage,
    handlePageChange,
}: any) => {
  return (
    <div>
      <AgentTable
        data={data}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Agents