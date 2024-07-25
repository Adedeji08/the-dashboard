import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { TailSpin } from "react-loader-spinner";
import DeleteMediator from "./mediators/delete-mediator";

const MediatorTable = ({ data }: any) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const columns = [
    { header: "", accessor: "profilePhoto" },
    { header: "Name", accessor: "fullName" },
    { header: "Email Address", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Date Added", accessor: "createdAt" },
    { header: " ", accessor: "updatedAt" },
  ];

  const handleUserClick = (_id: string) => {
    setSelectedUserId(_id);
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
        <DeleteMediator
          visible={!!selectedUserId} 
          handleClose={handleCloseModal}
          id={selectedUserId}
        />
      )} 
    </div>
  );
};

export default MediatorTable;
