import React from "react";
import Cards from "../cards";
import UserTable from "../user-table";

const Buyer = ({ data, stat, selectedStatus, handleStatusChange }: any) => {
  return (
    <div>
      <Cards stat={stat} />
      <UserTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Buyer;
