import React from "react";
import Icon from "../../../assets/icons";
import { truncate } from "lodash";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";
import Button from "../../../components/button";
import { TailSpin } from "react-loader-spinner";
import { CircleLoader } from "react-spinners";
import { capitalizeFirstLetter } from "../../../utilities/functions";

interface Item {
  amount: number;
  currency: string;
  quantity: number;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  orderId: string;
  merchantName: string | null;
  merchantBusinessName: string;
  merchantPhoneNumber: string;
  merchantEmail: string;
  merchantSocialMediaHandle: string;
  merchantSocialMediaPlatform: string | null;
  socialMediaPlatform: string | null;
  buyerName: string;
  buyerPhoneNumber: string;
  buyerEmail: string;
  buyerSocialMediaHandle: string;
  buyerSocialMediaPlatform: string | null;
  createdBy: string;
  status: string;
  code: string;
  promo: string | null;
  transactionFee: number;
  created_at: string;
  updated_at: string;
  items: Item[];
}

interface Refund {
  id: string;
  orderId: string;
  reason: string;
  note: string;
  proof: string[];
  status: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectedBy: string | null;
  rejectedAt: string | null;
  created_at: string;
  updated_at: string;
  order: Order & { buyerSocialMediaHandle: string };
}

interface DetailsProps {
  refund: Refund | null;
}

const Details: React.FC<DetailsProps> = ({ refund }) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: getApproved, loading } = useRequest(
    `/orders/refunds/${refund?.id}/approve`,
    "PUT",
    { userToken }
  );

  const { makeRequest: getDeleted, loading: loading1 } = useRequest(
    `/orders/refunds/${refund?.id}/reject`,
    "PUT",
    { userToken }
  );

  if (!refund) {
    return (
      <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
        <TailSpin color="skyblue" />
      </div>
    );
  }

  const Detail = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="flex justify-between mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#D1FFC9";
      case "rejected":
        return "#FCCFCF";
      case "pending":
        return "#FBFCCF";
      default:
        return "transparent";
    }
  };

  const getFilenameFromUrl = (url: string) => {
    const filename = url.split("/").pop();
    return truncate(filename, {
      length: 20,
      separator: "...",
    });
  };

  const handleApproved = async () => {
    const [response] = await getApproved();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  const handleDelete = async () => {
    const [response] = await getDeleted();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  const Proof = ({ proofUrl }: { proofUrl: string }) => {
    const shortenedFilename = getFilenameFromUrl(proofUrl);

    return (
      <div className="border text-ellipsis flex justify-between px-9 text-[#0979A1] font-semibold bg-[#CFF0FC] pt-6 text-[14px] h-20 mt-3 rounded-md">
        {shortenedFilename || "N/A"}
        <a href={proofUrl} download={shortenedFilename}>
          <Icon name="backupIcon" />
        </a>
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-[95%]">
      <section className="w-[36%] mx-auto">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px]">Request Details</h2>
          <p
            className="text-[10px] flex gap-3 w-28 p-2 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(
               refund?.status || "N/A"
              ),
            }}
          >
            <span
              style={{
                backgroundColor:
                  refund?.status === "approved" ? "green" : "red",
              }}
              className="h-[6px] w-[6px] rounded-full mt-1 ml-3"
            ></span>

            {capitalizeFirstLetter(refund?.status || "")}
          </p>
        </div>
        <Detail title="Name" value={refund?.order?.buyerName} />
        <Detail title="Email address" value={refund?.order?.buyerEmail} />
        <Detail title="Order ID" value={refund?.orderId} />
        <Detail
          title="Date"
          value={new Date(refund?.created_at).toLocaleString()}
        />
        <div className="mt-5">
          <div className=" mt-5">
            <p>Reason for refund:</p>
            <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
              {refund?.reason || "N/A"}
            </p>
          </div>

          <div className=" mt-5">
            <p>Other Notes/reason:</p>
            <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
              {refund?.note || "N/A"}
            </p>
          </div>

          <div className="mt-5">
            <p>Proof:</p>
            <div className="overflow-auto">
            {refund?.proof?.length ? (
              refund.proof.map((url) => <Proof key={url} proofUrl={url} />)
            ) : (
              <p className="border pl-10 text-[14px] p-3 mt-3 rounded-md">
                N/A
              </p>
            )}
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center justify-between mt-5">
            <Button onClick={handleApproved} variant="primary" size="lg">
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                "Approve"
              )}
            </Button>

            <Button onClick={handleDelete} variant="secondary" size="lg">
              {loading1 ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
