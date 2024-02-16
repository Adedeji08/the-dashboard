import React from "react";
import UserTable from "../user-table";
import Cards from "../cards";

const Merchant = ({data, stat}: any) => {
  return (
    <div>
      <Cards  stat={stat}/>
      <UserTable data={data} />
    </div>
  );
};

export default Merchant;
