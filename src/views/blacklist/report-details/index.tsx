import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import useRequest from "../../../components/hooks/use-request";
import { useParams } from "react-router-dom";
import Details from "./details";
import PreviousReport from "./previous-report";



const ReportDetails = () => {
  const [reports, setReports] = useState([]);
  const { makeRequest } = useRequest("/reports", "GET");
  const { id } = useParams<{ id: string }>();



  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setReports(response?.data?.reports || []);
    };
    fetchData();
  }, []);

  const selectedReport = (reports as any[]).find(
    (report) => report.id === id
  );

  return (
    <>
      <Back />
      <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full flex">
        <Details report={selectedReport} />
       <PreviousReport report={selectedReport}/>
      </div>
    </>
  );
};

export default ReportDetails;
