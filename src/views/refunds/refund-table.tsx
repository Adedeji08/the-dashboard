import React from 'react'
import Table from '../../components/table'
import { useNavigate } from 'react-router-dom';

const RefundTable = () => {
    const navigate = useNavigate()
    const columns = [
        { header: "Order ID", accessor: "orderId" },
        { header: "Buyer’s Email", accessor: "buyerEmail" },
        { header: "Amount", accessor: "amount" },
        { header: "Status", accessor: "status" },
        { header: "Date", accessor: "Date" },
        { header: "", accessor: "id" },
      ];

      const data = [
        { header: "Order ID", accessor: "orderId" },
        { header: "Buyer’s Email", accessor: "buyerEmail" },
        { header: "Amount", accessor: "amount" },
        { header: "Status", accessor: "status" },
        { header: "Date", accessor: "Date" },
        { header: "", accessor: "id" },
      ];

      const handleUserClick = (id: string) => {
        navigate(`/account/details/${id}`)
      };

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
    <div className="flex justify-between">
      <p className="text-[18px] font-semibold">All Accounts</p>
      <div className="flex gap-2">
        <span className="text-[14px] font-medium">Filter by: </span>
        <select
          className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
        //   value={selectedStatus}
        //   onChange={handleStatusChange}
        >
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>

      <Table columns={columns} data={data} selectedUserId={null} onUserClick={handleUserClick} />
   
  </div>
  )
}

export default RefundTable