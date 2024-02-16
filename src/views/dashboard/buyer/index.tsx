import React from "react";
import Cards from "../cards";
import UserTable from "../user-table";

const Buyer = ({ data }: any) => {
  return (
    <div>
      <Cards />
      <UserTable data={data} />
    </div>
  );
};

export default Buyer;
