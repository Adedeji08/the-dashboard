import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";

interface DetailsProps {
  request:
    | {
        ticket: {
          id: string;
          fullName: string;
          email: string;
          status: string;
          created_at: string;
          ticketId: string;
          message: string;
          subject: string;
        };
      }
    | undefined;
}

const Details: React.FC<DetailsProps> = ({ request }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
        case "resolved":
            return "#D1FFC9";
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

  return (
    <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-[95%] ">
      <section className="w-[45%] mx-auto">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px]">Request Details</h2>
          <p
            className="text-[10px] flex gap-3 w-20 h-4 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(request?.ticket?.status || "N/A"),
            }}
          >
            <span
              style={{
                backgroundColor:
                  request?.ticket?.status === "resolved" || "active" ? "green" : "red",
              }}
              className="h-[6px] w-[6px] rounded-full mt-1 ml-3"
            ></span>

            {capitalizeFirstLetter(request?.ticket?.status || "")}
          </p>
        </div>

        <Detail
          title="Name"
          value={capitalizeFirstLetter(request?.ticket?.fullName || "N/A")}
        />

        <Detail title="Email address" value={request?.ticket?.email || "N/A"} />

        <Detail title="Ticket ID" value={request?.ticket?.ticketId || "N/A"} />

        <Detail
          title="Assigned to:"
          value={request?.ticket?.fullName || "N/A"}
        />

        <Detail
          title="Date"
          value={formatDate(request?.ticket?.created_at || "N/A")}
        />

        <div className=" mt-5">
          <p>Request Title:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {request?.ticket?.subject || "N/A"}
          </p>
        </div>

        <div className=" mt-5">
          <p>Request:</p>
          <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
            {request?.ticket?.message || "N/A"}
          </p>
        </div>

        <button className="h-[50px] mt-8 w-full bg-[#0979A1] text-white rounded-md font-bold text-[12px]">
          Assign to agent
        </button>
      </section>
    </div>
  );
};

export default Details;
