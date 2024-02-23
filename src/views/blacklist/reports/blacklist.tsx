import React from "react";
import BlacklistedTable from "../blacklisted-table";

const BlacklistedReport = ({ blacklist, currentPage, handlePageChange }: any) => {
  return (
    <div>
      <BlacklistedTable
        blacklist={blacklist}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlacklistedReport;
