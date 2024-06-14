import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import { TailSpin } from "react-loader-spinner";

const ReportTable = ({
  data,
  currentPage,
  onPageChange,
}: any) => {
  const navigate = useNavigate();
  const columns = [
    //   { header: "Case ID", accessor: "orderId" },
    { header: "Email Address", accessor: "email" },
    { header: "Name", accessor: "fullname" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  const mappedData = data.map((report: any) => ({
    ...report,
    email: report.reportedMerchant.email,
    fullname: report.reportedMerchant.fullname,
    status: report.reportedMerchant.status,
    created_at: report.reportedMerchant.created_at,
    // id: report.reportedMerchant.id,
  }));

  const handleUserClick = (id: string) => {
    navigate(`/report/${id}`);
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
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )}
    </div>
  );
};

export default ReportTable;
