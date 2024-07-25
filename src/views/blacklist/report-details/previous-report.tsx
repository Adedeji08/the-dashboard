import React, { useEffect, useState } from "react";
import Textarea from "../../../components/textarea";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/button";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import { Link, useNavigate } from "react-router-dom";
import Placeholder from "../../../assets/Ellipse 5.svg";
import { CircleLoader } from "react-spinners";

interface Report {
  report: {
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
    };
    reportedBy: {
      id: string;
      fullname: string;
      phone: string;
      socialMediaPlatform: string;
      socialMediaHandle: string;
      created_at: string;
    };
  };
}

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

const PreviousReport: React.FC<Report> = ({ report }) => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm();
  const userToken = localStorage.getItem("token");
  const reportId = report?.id;
  const [data, setData] = useState<MerchantDetailsProps[]>([]);
  const [displayedData, setDisplayedData] = useState<MerchantDetailsProps[]>(
    []
  );
  const [showAll, setShowAll] = useState(false);
  const merchantEmail = report?.reportedMerchant?.fullname;
  const { makeRequest: getApproved, loading } = useRequest(
    `/reports/blacklist/${reportId}`,
    "POST",
    { userToken }
  );

  const { makeRequest: getDeleted, loading:loading1 } = useRequest(
    `/reports/delete/${reportId}`,
    "DELETE",
    { userToken }
  );

  const { makeRequest: getReportId } = useRequest(
    `/reports/merchants/${report?.reportedMerchant?.id}`,
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
    if (report?.reportedMerchant?.id) {
      const [response] = await getReportId();
      setData(response.data?.report || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, [report?.reportedMerchant?.id]);

  useEffect(() => {
    if (showAll) {
      setDisplayedData(data);
    } else {
      setDisplayedData(data?.slice(0, 3));
    }
  }, [data, showAll]);

  const handleApproved = handleSubmit(async (formData) => {
    const UserReason = {
      reason: formData.reason,
    };
    const [response] = await getApproved(UserReason);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  const handleDelete = async () => {
    const [response] = await getDeleted();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
    } else {
      showToast(response.message[0], false, {
        position: "top-center",
      });
    }
  };

  const handleClick = () => {
    navigate(`/report/${reportId}`);
  };

  return (
    <section className="w-full px-10">
      <div className="flex justify-between mt-10">
        <h2 className="text-[14px] font-medium">Previous Reports</h2>
        <p className="text-[12px]">
          <Link to="/blacklist">see all</Link> ({data?.length})
        </p>
      </div>

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
                alt="pho"
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
                onClick={handleClick}
                className="text-[8px] bg-[#0979A1] text-white rounded-md w-[90px] h-[20px]"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleApproved} className="mt-10">
        <p className="text-[14px] font-medium">Approve Report</p>
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          rules={{
            required: "Reason is required",
            minLength: {
              value: 10,
              message: "Reason must be at least 10 characters",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Textarea
                value={field.value}
                label="Reason for approval:"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            </>
          )}
        />
        <div className="flex gap-8 justify-center items-center mt-5 ">
          <Button size="lg" type="submit" variant="primary">
            {loading ? (
              <CircleLoader color="#fff" loading={loading} size={20} />
            ) : (
              "Approve report"
            )}
          </Button>
        </div>
      </form>

      <div className="flex gap-8 justify-center items-center mt-5">
        <Button
          size="lg"
          type="button"
          onClick={handleDelete}
          variant="secondary"
        >
          {loading1 ? (
            <CircleLoader color="#0979A1" loading={loading} size={20} />
          ) : (
            "Delete report"
          )}
        </Button>
      </div>
    </section>
  );
};

export default PreviousReport;
