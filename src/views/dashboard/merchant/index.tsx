import React from "react";
import UserTable from "../user-table";
import { AccountCards } from "../../../components/cards/account-card";

const Merchant = ({data, statistics, selectedStatus, handleStatusChange}: any) => {
  return (
    <div>
      <AccountCards  statistics={statistics}/>
      <UserTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Merchant;
