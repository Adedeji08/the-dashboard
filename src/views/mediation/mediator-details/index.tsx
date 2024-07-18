import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import Details from "./details";
import useRequest from "../../../components/hooks/use-request";

interface DetailsProps {
  channel: {
    _id: string;
    status: string;
    title: string;
    createdAt: string;
    caseID: string;
    description: string;
    attachment: string[];
    claimant: {
      email: string;
      fullName: string;
      isResponseAble: boolean;
    };
    mediator: {
      fullName: string;
    };
  };
}
const MediatorDetails = () => {
  const [mediateById, setMediateById] = useState<DetailsProps>();;
  const { _id } = useParams<{ _id: string }>();
  const { makeRequest: getMediationById } = useRequest(`/mediation/${_id}`, "GET");


  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getMediationById();
      setMediateById(response?.data || []);
    };
    fetchData();
  
  }, []);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Requests/Case ID {mediateById?.channel?.caseID}</h2>
      </div>
      <Details mediateById={mediateById} />
    </>
  );
};

export default MediatorDetails;
