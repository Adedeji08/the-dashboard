import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../components/adminTable";

const AdminTable = ({
  data,
  roles,
  handleStatusChange,
  handleSearchChange,
  selectedRole,
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
  }, [data, selectedRole]);

  const handleUserClick = (id: string) => {
    navigate(`/admins/detail/${id}`);
  };

  return (
    <div >
     

      {filteredData.length > 0 ? (
        <TableAdmin
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="py-28 px-44">
              <CircleLoader color="#0979A1" />
            </div>
          </div>
    
      )}
    </div>
  );
};

export default AdminTable;
