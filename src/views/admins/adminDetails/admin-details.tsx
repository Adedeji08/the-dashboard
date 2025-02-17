import React, { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import Icon from "../../../assets/icons";

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
    referralBalance: number;
  };
}

interface ReferralsProps {
  month: string;
  count: number;
}

const Details: React.FC<DetailsProps> = ({ admin }) => {
  const { id } = useParams<{ id: string }>();
  const { makeRequest: getReferrals } = useRequest(
    `/users/${id}/referrals`,
    "GET"
  );

  const { makeRequest: getReferralLink, loading } = useRequest(
    `/users/${id}/referral`,
    "PUT"
  );
  const [data, setData] = useState<ReferralsProps[]>([]);
  const [year, setYear] = useState<number>(2024);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(
    () => {
      const fetchData = async () => {
        const [response] = await getReferrals(undefined, {
          year: year,
        });
        const total = response?.data.reduce(
          (sum: number, item: any) => sum + (item.count || 0),
          0
        );

        setTotalCount(total);
        setData(response?.data || []);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year]
  );

  const generateReferralLink = async () => {
    try {
      const [response] = await getReferralLink();

      if (response.status === true) {
        //alert("Referral link generated successfully");
        showToast(response.message, true, {
          position: "top-center",
        });
        window.location.reload();
      } else {
        showToast(response.message, false, {
          position: "top-center",
        });
      }
    } catch (err) {}
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  };

  const userType = admin.userType;
  const Details = ({ title, value, img }: any) => {
    return (
      <div className="grid grid-cols-2 px-6 mt-4 font-normal text-base">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };

  const ReferralLink = ({ title, value, img }: any) => {
    return (
      <button
        className={`border-2 ${"border-[#0979A1] bg-[#0979A1]"} w-[289px] flex items-center justify-center h-[43px] font-bold text-[#fff] rounded-md`}
        type="submit"
        onClick={generateReferralLink}
      >
        {loading ? (
          <CircleLoader color="#ffffff" loading={loading} size={20} />
        ) : (
          "Generate Referral Link"
        )}
      </button>
    );
  };

  const CopyReferralLink = ({ title, value, img }: any) => {
    const shortenedValue = truncateText(value, 16);
    return (
      <div className="grid grid-cols-2 px-6 mt-4">
        <p>{title}</p>
        <button
          className={`border-none border-0 text-right rounded-md flex gap-1 items-center`}
          type="submit"
          onClick={() => {
            navigator.clipboard.writeText(value);
            alert("Copied to clipboard");
          }}
        >
          {shortenedValue}
          <Icon name="clipBoard" />
        </button>
      </div>
    );
  };

  const CopyReferralCode = ({ title, value, img }: any) => {
    const getReferralCode = (link: string) => {
      try {
        const url = new URL(link);
        return url.searchParams.get("r") || link;
      } catch (error) {
        return link;
      }
    };

    const referralCode = getReferralCode(value);

    return (
      <div className="grid grid-cols-2 px-6 mt-4">
        <p>{title}</p>
        <button
          className={`border-none border-0 text-right rounded-md flex gap-1 items-center`}
          type="submit"
          onClick={() => {
            navigator.clipboard.writeText(referralCode);
            alert("Copied to clipboard");
          }}
        >
          {referralCode}
          <Icon name="clipBoard" />
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className=" bg-white border border-[#fff] mt-10 pt-14 pb-10 rounded-lg w-full flex justify-between gap-16">
        <div className="ml-24">
          <div className="flex gap-6 items-center px-6 mb-10">
            <img
              className="w-[117px] h-[117px] rounded-full"
              src={
                admin?.profilePhoto ||
                `https://ui-avatars.com/api/?name=${admin.fullname}&background=0979A1&color=fff`
              }
              alt="profile"
            />
            <div>
              <p className="font-bold text-base">Admin</p>
              <p className="text-sm"> {admin?.email || "N/A"}</p>
            </div>
          </div>

          <Details
            title={userType === "buyer" ? "Name" : "Name"}
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

          {admin?.referralLink && (
            <CopyReferralCode
              title="Referral Code:"
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
        <div className="overflow-x-auto w-[368px]  border rounded-lg  mr-20 shadow-xl">
          <table className="min-w-full min-h-full bg-white">
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
            <tfoot className="bg-[#0979A1] text-white mt-auto">
              <tr>
                <td className="py-2 px-4 text-center border-r border-gray-200 ">
                  <span className="block text-[#fff] text-[12px]">
                    Calculated Amount:{" "}
                  </span>{" "}
                  {admin?.referralBalance}
                </td>
                <td className="py-2 px-4 text-center border-r border-gray-200 ">
                  <span className="block text-[#fff] text-[12px]">
                    Number of Referrals
                  </span>
                  {totalCount}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
