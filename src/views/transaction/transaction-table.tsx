import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const TransactionTable = ({
  data,
  selectedStatus,
  handleStatusChange,
  currentPage,
  onPageChange,
}: any) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Merchant’s Email", accessor: "merchantEmail" },
    { header: "Buyer’s Email", accessor: "buyerEmail" },
    { header: "Status", accessor: "status" },
    { header: "Amount", accessor: "amount" },
    { header: "Date", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = data.filter((user: any) => {
      if (user.status) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [data, selectedStatus]);

  const handleUserClick = (id: string) => {
    navigate(`/transaction/details/${id}`);
  };

  const mappedData = filteredData.map((transaction: any) => ({
    ...transaction,
    orderId: transaction?.order?.orderId ? transaction?.order?.orderId : "N/A",
    buyerEmail: transaction?.order?.buyerEmail
      ? transaction?.order?.buyerEmail
      : "N/A",
    merchantEmail: transaction?.order?.merchantEmail
      ? transaction?.order?.merchantEmail
      : "N/A",
  }));

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
        <div className="flex gap-2">
          <span className="text-[14px] font-medium">Filter by: </span>
          <select
            className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={mappedData}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      ) : (
        // <h1 className="text-[30px] text-center text-gray-500 opacity-80 mt-10 font-bold">
        //   No data available
        // </h1>
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
        <TailSpin color="skyblue" />
       </div>
      )}
    </div>
  );
};

export default TransactionTable;
