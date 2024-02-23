import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";

const BlacklistedTable = ({
  blacklist,
  selectedStatus,
  handleStatusChange,
  currentPage,
  onPageChange,
}: any) => {
  const navigate = useNavigate();
  const columns = [
    //   { header: "Case ID", accessor: "orderId" },
    { header: "Email Address", accessor: "email" },
    { header: "Name", accessor: "fullname" },
    { header: "Date", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  const mappedData = blacklist.map((blacklist: any) => ({
    ...blacklist,
    email: blacklist.merchant.email,
    fullname: blacklist.merchant.fullname,
    created_at: blacklist.merchant.created_at,
  }));

  const handleUserClick = (id: string) => {
    navigate(`/transaction/details/${id}`);
  };

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <p className="text-[18px] font-semibold">Blacklisted merchants</p>

      {mappedData.length > 0 ? (
        <Table
          columns={columns}
          data={mappedData}
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

export default BlacklistedTable;
