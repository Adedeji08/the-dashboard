import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import TableAdmin from "../../components/adminTable";

const AdminTable = ({
  data,
  handleStatusChange,
  handleSearchChange,
  selectedStatus,
  searchQuery,
  activeTab,
}: any) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    //{header: "", accessor: <input/>},
    { header: "", accessor: "fullname" },
    {
      header: activeTab === "merchant" ? "Business Name" : "Name",
      accessor: "fullname",
    },
    { header: "Email Address", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    { header: "Roles", accessor: "userType" },
    { header: " ", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = data.filter((admin: any) => {
      if (admin.status) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [data, selectedStatus]);

  const handleUserClick = (id: string) => {
    navigate(`/admins/detail/${id}`);
  };

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold"> Select All</p>
        <div className="flex gap-5 items-center">
          <div className="border-2 rounded-md solid pl-5 bg-transparent  h-[45px] flex gap-3">
            <Icon name="searchIcon" className="mt-3 rounded" />
            <input
              className="outline-none border-none w-[80%] bg-transparent"
              id="input-placeholder"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <span className="text-[14px] font-medium">Filter by:</span>
            <select
              className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="customer support">Customer Support</option>
              
            </select>
          </div>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <TableAdmin
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      ) : (
        <h1 className="text-[30px] text-center text-gray-500 opacity-80 mt-10 font-bold">
          No data available
        </h1>
      )}
    </div>
  );
};

export default AdminTable;
