import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const UserTable = ({
  data,
  selectedStatus,
  handleStatusChange,
  activeTab,
}: any) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "", accessor: "profilePhoto" },
    {
      header: activeTab === "merchant" ? "Business Name" : "Name",
      accessor: "fullname",
    },
    { header: "Email Address", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    { header: "Status", accessor: "status" },
    { header: "Date Joined", accessor: "created_at" },
    { header: " ", accessor: "id" },
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
    navigate(`/account/details/${id}`);
  };

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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
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

export default UserTable;
