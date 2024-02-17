import React from "react";
import UserTable from "../user-table";
import Cards from "../cards";

const Merchant = ({data, stat, selectedStatus, handleStatusChange}: any) => {
  console.log('selectedStatus', selectedStatus)
  return (
    <div>
      <Cards  stat={stat}/>
      <UserTable data={data} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Merchant;
