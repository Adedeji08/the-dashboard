import React, { useState } from "react";
import Table from "../../components/table";

const UserTable = ({ data }: any) => {
  const columns = [
    { header: "", accessor: "profilePhoto" },
    { header: "Name", accessor: "fullname" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    { header: "Date Joined", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
        <div className="flex gap-2">
          <span className="text-[14px] font-medium">Filter by: </span>
          <select className="border text-[12px]  px-3 py-1 rounded bg-[#0979A1] text-white">
            <option>Recent</option>
            <option>Recent</option>
            <option>Recent</option>
          </select>
          <button className="text-[12px] border px-3 py-1 rounded">
            {" "}
            1 day ago{" "}
          </button>
        </div>
      </div>
      <Table columns={columns} data={data}/>
    </div>
  );
};

export default UserTable;
