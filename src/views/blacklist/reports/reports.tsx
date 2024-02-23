import React from "react";
import ReportTable from "../report-table";
import { ReportCards } from "../../../components/cards/report-card";

const Reports = ({ data, statistics, currentPage, handlePageChange }: any) => {
  return (
    <>
      <ReportCards statistics={statistics} />

      <ReportTable
        data={data}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Reports;
