import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import Details from "./details";
import useRequest from "../../../components/hooks/use-request";

const MediatorDetails = () => {
  const [mediate, setMediate] = useState([]);
  const { _id } = useParams<{ _id: string }>();
  const { makeRequest: getMediation } = useRequest("/mediation", "GET");

  const selectedChannel = (mediate as any[]).find(
    (channels) => channels._id === _id
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getMediation();
      setMediate(response?.data?.channels || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Requests/Case ID {_id}</h2>
      </div>
      <Details channels={selectedChannel} />
    </>
  );
};

export default MediatorDetails;
