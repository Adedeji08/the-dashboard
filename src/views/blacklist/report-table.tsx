import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";

const ReportTable = ({
  data,
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

  const mappedData = data.map((report: any) => ({
    ...report,
    email: report.reportedMerchant.email,
    fullname: report.reportedMerchant.fullname,
    created_at: report.reportedMerchant.created_at,
  }));

  const handleUserClick = (id: string) => {
    navigate(`/report/details/${id}`);
  };
  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <p className="text-[18px] font-semibold">Reports</p>

      {mappedData.length > 0 ? (
        <Table
          columns={columns}
          data={mappedData}
          selectedUserId={null}
          onUserClick={handleUserClick}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ) : (
        <h1 className="text-[30px] text-center text-gray-500 opacity-80 mt-10 font-bold">
          No data available
        </h1>
      )}
    </div>
  );
};

export default ReportTable;
