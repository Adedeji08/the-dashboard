import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

  const MediationTable = ({ data, selectedStatus, handleStatusChange }: any) => {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Case ID", accessor: "caseID" },
    { header: "Request Title", accessor: "title" },
    { header: "Name", accessor: "fullName" },
    { header: "Assigned To", accessor: "fullname" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "createdAt" },
    { header: " ", accessor: "_id" },
  ];

  useEffect(() => {
    const filtered = data?.filter((user: any) => {
      if (user.status) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [data, selectedStatus]);

  const handleUserClick = (_id: string) => {
    navigate(`/mediation/details/${_id}`)
  };

  const mappedData = filteredData?.map((mediate: any) => ({
    ...mediate,
    fullName: mediate?.claimant?.fullName || 'N/A',
    fullname: mediate?.mediator?.fullName || 'N/A',
  }));
  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">Recent Request</p>
        <div className="flex gap-2">
          <span className="text-[14px] font-medium">Filter by: </span>
          <select
            className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
             <option value="">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {filteredData?.length > 0 ? (
        <Table columns={columns} data={mappedData} selectedUserId={null} onUserClick={handleUserClick} />
      ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
        <TailSpin color="skyblue" />
       </div>
      )}
    </div>
  )
}

export default MediationTable