import React from "react";
import UserTable from "../user-table";
import Cards from "../cards";

const Merchant = ({data}: any) => {
  return (
    <div>
      <Cards />
      <UserTable data={data} />
    </div>
  );
};

export default Merchant;
