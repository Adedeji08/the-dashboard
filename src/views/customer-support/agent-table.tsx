import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import AgentProfile from "./agents/agent-profile";
import { TailSpin } from "react-loader-spinner";

const AgentTable = ({ data }: any) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // State to store the selected user's ID
  const columns = [
    { header: "", accessor: "profilePhoto" },
    { header: "Name", accessor: "fullname" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    { header: "Date Added", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  const handleUserClick = (id: string) => {
    setSelectedUserId(id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null); 
  };

  return (
    <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5 ">
      <div className="flex justify-between">
        <p className="text-[18px] font-semibold">All Accounts</p>
      </div>

      {data?.length > 0 ? (
        <Table
          columns={columns}
          data={data}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )}

      {selectedUserId && (
        <AgentProfile
          visible={!!selectedUserId} 
          handleClose={handleCloseModal}
          id={selectedUserId}
        />
      )}
    </div>
  );
};

export default AgentTable;
