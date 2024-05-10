import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";

const AgentTable = ({
  data,
  currentPage,
  onPageChange,
}: any) => {
  const navigate = useNavigate();
  const columns = [
    { header: "", accessor: "profilePhoto" },
    { header: "Name", accessor: "fullname" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    { header: "Date Added", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];



  const handleUserClick = (id: string) => {
    navigate(`/request/${id}`);
  };


  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
      </div>

      {data?.length > 0 ? (
        <Table
          columns={columns}
          data={data}
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

export default AgentTable;
