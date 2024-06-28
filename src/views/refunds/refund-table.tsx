import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const RefundTable = ({ refunds, selectedStatus, handleStatusChange }: any) => {
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Buyer’s Email", accessor: "buyerEmail" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "created_at" },
    { header: " ", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = refunds?.filter((user: any) => user.status);
    setFilteredData(filtered);
  }, [refunds, selectedStatus]);

  const mappedData = filteredData?.map((refund: any) => ({
    ...refund,
    buyerEmail: refund?.order?.buyerEmail || "N/A",
    amount: refund?.order?.items.reduce((sum: number, item: any) => sum + (parseFloat(item.amount) || 0), 0) || "N/A",
  }));

  const handleUserClick = (id: string) => {
    navigate(`/refund/${id}`);
  };

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
        <div className="flex gap-2">
          <span className="text-[14px] font-medium">Filter by: </span>
          <select 
           value={selectedStatus}
           onChange={handleStatusChange}
          className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white">
          <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredData?.length > 0 ? (
        <>
          <Table
            columns={columns}
            data={mappedData}
            selectedUserId={null}
            onUserClick={handleUserClick}
          />
          
        </>
      ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
          <TailSpin color="skyblue" />
        </div>
      )}
    </div>
  );
};

export default RefundTable;
