import React, { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import PlaceholderImage from "../../../assets/Ellipse 5.svg";
import { CircleLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import { use } from "echarts";

interface DetailsProps {
  admin: {
    id: string;
    fullname: string;
    email: string;
    referralLink: string;
    status: string;
    created_at: string;
    orderId: string;
    password: string;
    phone: string;
    profilePhoto: string;
    userType: string;
  };
}

interface ReferralsProps {
  month: string;
  count: number;
}

const Details: React.FC<DetailsProps> = ({ admin }) => {
  const { loading } = useRequest("/", "GET");
  const { id } = useParams<{ id: string }>();
  const { makeRequest: getReferrals } = useRequest(
    `/users/${id}/referrals`,
    "GET"
  );

  const { makeRequest: getReferralLink } = useRequest(
    `/users/${id}/referral`,
    "PUT"
  );
  const [data, setData] = useState<ReferralsProps[]>([]);
  const [year, setYear] = useState<number>(2024);

  useEffect(
    () => {
      const fetchData = async () => {
        const [response] = await getReferrals(undefined, {
          year: year,
        });
        setData(response?.data || []);
        console.log("year", response);
      };
      fetchData();
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
    [year]
  );

  const generateReferralLink = async () => {
    try {
      const [response] = await getReferralLink();
      console.log(response);
      if (response.status === true) {
        //alert("Referral link generated successfully");
        const [response] = await getReferrals();
        setData(response?.data || []);
        console.log(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  };

  /*const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#D1FFC9";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      case "suspended":
        return "#FBFCCF";
      default:
        return "transparent";
    }
  };*/

  const userType = admin.userType;
  const Details = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between px-6 mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };
  const ReferralLink = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between gap-10 px-6 mt-4">
        <p>{title}</p>
        <button
          className={`border-2 ${"border-[#0979A1] bg-[#0979A1]"} w-[289px] h-[43px] font-bold text-[#fff] rounded-md`}
          type="submit"
          onClick={generateReferralLink}
        >
          Generate Referral Link
        </button>
      </div>
    );
  };
  const CopyReferralLink = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between px-6 mt-4">
        <p>{title}</p>
        <button
          className={`border-none border-0 text-right rounded-md`}
          type="submit"
          onClick={() => {
            navigator.clipboard.writeText(value);
            alert("Copied to clipboard");
          }}
        >
          {value}
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className=" bg-white border border-[#fff] mt-10 pt-14 pb-10 rounded-lg w-full flex justify-between gap-10">
        <div className="ml-28">
          <div className="flex justify-between items-center px-6">
            <img
              className="w-[117px] h-[117px] rounded-full"
              src={admin?.profilePhoto || PlaceholderImage}
              alt="profile"
            />
            <div>
              <p>Admin</p>
              <p className="text-sm"> {admin?.email || "N/A"}</p>
            </div>
          </div>

          <Details
            title={userType === "buyer" ? "Name" : "Business Name"}
            value={admin?.fullname || "N/A"}
          />
          <Details title="Email address:" value={admin?.email || "N/A"} />

          <Details title="Phone number:" value={admin?.phone || "N/A"} />

          {admin?.referralLink ? (
            <CopyReferralLink
              title="Referral Link:"
              value={admin?.referralLink || "N/A"}
            />
          ) : (
            <ReferralLink
              title="Generate referral link:"
              value={admin?.referralLink || "N/A"}
            />
          )}

          {/*<div className="flex justify-between px-6 mt-4">
            <p className="">Account status:</p>
            <p
              className="text-[12px] w-20 h-4 text-center rounded-md"
              style={{
                backgroundColor: getStatusColor(admin?.status || "N/A"),
              }}
            >
              {capitalizeFirstLetter(admin?.status || "N/A")}
            </p>
            </div>*/}
        </div>
        <div className="overflow-x-auto w-[368px] border rounded-lg mr-20 shadow-xl">
          <table className="min-w-full bg-white">
            <thead className="bg-[#0979A1] text-white">
              <tr>
                <th className="py-2 px-4 border-r border-gray-200 text-left">
                  Month
                  <input
                    className="bg-transparent outline-none border-2 rounded-lg px-1 ml-2 "
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    value={year}
                    onChange={handleChange}
                  />
                </th>
                <th className="py-2 px-4 text-center">No. of Referrals</th>
              </tr>
            </thead>
            <tbody>
              {data.map((referral: any, index: number) => (
                <tr key={index} className="">
                  <td className="py-2 px-4 border-r border-gray-200 ">
                    {referral.month}
                  </td>
                  <td className="py-2 px-4 text-center">{referral.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
