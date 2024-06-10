import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import useRequest from "../../../components/hooks/use-request";
import { useParams } from "react-router-dom";
import Details from "./details";
import PreviousReport from "./previous-report";

interface Report {
  id: string;
  note: string;
  image: string;
  status: string;
  reportedMerchant: {
    id: string;
    fullname: string;
    phone: string;
    socialMediaPlatform: string;
    socialMediaHandle: string;
    created_at: string;
    email: string;
  };
}


const ReportDetails = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const { id } = useParams<{ id: string }>();
  const { makeRequest } = useRequest(`/reports/${id}`, "GET");

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setReports(response?.data?.report || []);
    };
    fetchData();
  }, []);

  const report = reports[0]; 


  return (
    <>
      <Back />
      <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full flex">
        <Details report={report} />
       <PreviousReport report={report}/>
      </div>
    </>
  );
};

export default ReportDetails;