import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import AssignMediator from "../mediate/assign-mediator";

interface DetailsProps {
  channels: {
    id: string;
    status: string;
    title: string;
    createdAt: string;
    caseID: string;
    description: string;
    claimant: {
      email: string;
      fullName: string;
      isResponseAble: boolean;
    };
  };
}

const Details: React.FC<DetailsProps> = ({ channels }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
      case "active":
        return "#057517";
      case "closed":
        return "#FCCFCF";
      case "cancelled":
        return "#FBFCCF";
      default:
        return "transparent";
    }
  };

  const Detail = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  const addMediator = () => {
    setModalVisible(true);
  };
  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-[95%] ">
      <section className="w-[36%] mx-auto">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px]">Request Details</h2>
          <p
            className="text-[10px] flex gap-3 w-20 h-4 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(
                channels?.status ? channels?.status : "N/A"
              ),
            }}
          >
            <span
              style={{
                backgroundColor:
                  channels?.status === "active"
                    ? "green" // Change this color to the shade of green you want for active status
                    : "red", // Default color for other statuses
              }}
              className="h-[6px] w-[6px] rounded-full mt-1 ml-3"
            ></span>

            {capitalizeFirstLetter(channels?.status)}
          </p>
        </div>

        <Detail
          title="Name"
          value={capitalizeFirstLetter(channels?.claimant?.fullName || "N/A")}
        />

        <Detail
          title="Email address"
          value={channels?.claimant?.email || "N/A"}
        />

        <Detail title="Case ID" value={channels?.caseID || "N/A"} />

        <Detail title="Date" value={formatDate(channels?.createdAt || "N/A")} />

        <div className=" mt-5">
          <p>Request Title:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {channels?.title}
          </p>
        </div>

        <div className=" mt-5">
          <p>Request:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {channels?.description}
          </p>
        </div>

        <button
          className="h-[50px] mt-8 w-full bg-[#0979A1] text-white rounded-md font-bold text-[12px] "
          onClick={addMediator}
        >
          Assign a Mediator
        </button>

        <button className="h-[50px] mt-8 w-full bg-transparent text-[#0979A1] border border-[#0979A1] rounded-md font-bold text-[12px] ">
          Delete Request
        </button>
      </section>
      <AssignMediator
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Details;
