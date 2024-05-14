import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Details from "./details";

interface DetailsProps {
  ticket: {
    assignedTo: {
      fullname: string;
    },
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

const RequestDetails = () => {
  const [request, setRequest] = useState<DetailsProps>();
  const { id } = useParams<{ id: string }>();
  const { makeRequest: getRequestById } = useRequest(
    `/customer-support/tickets/${id}`,
    "GET"
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getRequestById();
      setRequest(response?.data || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">
          Requests/Ticket ID: {request?.ticket?.ticketId}
        </h2>
      </div>
      <Details request={request} />
    </>
  );
};

export default RequestDetails;
