import React, { useEffect, useState } from 'react'
import useRequest from '../../../components/hooks/use-request';
import Placeholder from "../../../assets/Ellipse 5.svg";
import { useNavigate } from 'react-router-dom';

interface MerchantDetailsProps {
  id: string;
  note: string;
  image: string[];
  status: string;
  reportedMerchant: {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    socialMediaPlatform: string;
    socialMediaHandle: string;
    status: string;
    profilePhoto: string;
  };
}

interface DetailsProps {
  report: {
    id: string;
    merchant: {
      id: string;
    };
  };
}

const PreviousReport: React.FC<DetailsProps> = ({ report }) => {
  const navigate = useNavigate
  const reportId = report?.id;
  const userToken = localStorage.getItem("token");
  const [data, setData] = useState<MerchantDetailsProps[]>([]);
  const [displayedData, setDisplayedData] = useState<MerchantDetailsProps[]>([]);
  const [showAll, setShowAll] = useState(false);

  const { makeRequest: getReportId } = useRequest(
    `/reports/${report?.merchant?.id}`,
    "GET",
    { Authorization: `Bearer ${userToken}` }
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
    }
  };

  const fetchData = async () => {
    if (report?.merchant?.id) {
      const [response] = await getReportId();
      setData(response.data?.report || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, [report?.merchant?.id]);


  useEffect(() => {
    if (showAll) {
      setDisplayedData(data);
    } else {
      setDisplayedData(data?.slice(0, 8));
    }
  }, [data, showAll]);


  return (
    <section className="w-full px-10">
      <div>
        {displayedData.map((report, id) => (
          <div key={id} className="pt-4">
            <div className="flex gap-5">
              <img
                src={
                  report?.reportedMerchant?.profilePhoto
                    ? report?.reportedMerchant?.profilePhoto
                    : Placeholder
                }
                width={25}
                className="rounded-full"
                alt="pics"
              />
              <p
                className="text-[10px] rounded-md h-6 w-20 text-center pt-1 "
                style={{
                  backgroundColor: getStatusColor(
                    report?.reportedMerchant?.status
                      ? report?.reportedMerchant?.status
                      : "N/A"
                  ),
                }}
              >
                {report?.reportedMerchant?.status}
              </p>
            </div>

            <div className="flex gap-5 justify-between pl-14">
              <p className="text-[14px]">{report?.reportedMerchant?.email}</p>
              <button
               
                className="text-[8px] bg-[#0979A1] text-white rounded-md w-[90px] h-[20px]"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PreviousReport