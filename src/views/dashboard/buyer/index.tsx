import React from "react";
import UserTable from "../user-table";
import AccountCards from "../../../components/cards/account-cards";

const Buyer = ({ data, stat, selectedStatus, handleStatusChange }: any) => {
  return (
    <div>
      <AccountCards stat={stat} />
      <UserTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Buyer;
