import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import { TailSpin } from "react-loader-spinner";

const SupportTable = ({
  data,
  selectedStatus,
  handleStatusChange,
  currentPage,
  onPageChange,
}: any) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Ticket ID", accessor: "ticketId" },
    { header: "Subject", accessor: "subject" },
    { header: "Email Address", accessor: "email" },
    { header: "Status", accessor: "status" },
    { header: "Assigned To", accessor: "fullName" },
    { header: "Date", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = data?.filter((request: any) => {
      if (request.status) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [data, selectedStatus]);



  const handleUserClick = (id: string) => {
    navigate(`/request/${id}`);
  };

  const mappedData = filteredData.map((request: any) => ({
    ...request,
    fullName: request?.assignedTo?.fullname || "N/A",
  }));


  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
        <div className="flex gap-2">
          <span className="text-[14px] font-medium">Filter by:</span>
          <select
            className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
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
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )}
    </div>
  );
};

export default SupportTable;
