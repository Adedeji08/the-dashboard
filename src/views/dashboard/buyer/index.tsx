import React from "react";
import Cards from "../cards";
import UserTable from "../user-table";

const Buyer = ({ data, stat }: any) => {
  return (
    <div>
      <Cards stat={stat} />
      <UserTable data={data} />
    </div>
  );
};

export default Buyer;
