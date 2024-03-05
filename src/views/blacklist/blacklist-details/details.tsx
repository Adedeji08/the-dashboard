import React from "react";
import PlaceholderImage from "../../../assets/Ellipse 5.svg";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import Button from "../../../components/button";
import { CircleLoader } from "react-spinners";
import useRequest from "../../../components/hooks/use-request";
import { showToast } from "../../../components/toast";

interface DetailsProps {
  blacklist: {
    id: string;
    created_at: string;
    reason: string;
    merchant: {
      id: string;
      fullname: string;
      created_at: string;
      profilePhoto: string;
      bankName: string;
      bankAccountNumber: string;
      email: string;
      phone: string;
      status: string;
      socialMediaHandle: string;
      socialMediaPlatform: string;
    };
  };
}

const Details: React.FC<DetailsProps> = ({ blacklist }) => {
  const merchantEmail = blacklist?.merchant?.email;
  const userToken = localStorage.getItem("token");
  const { makeRequest: getDeleted, loading } = useRequest(
    `/reports/blacklist`,
    "DELETE",
    { userToken }
  );
  const Details = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between px-10 mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

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

  const handleDelete = async () => {
    const userEmail = {
      email: merchantEmail,
    };
    const [response] = await getDeleted(userEmail);
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

  return (
    <section className="w-full border-r-2">
      <div className="flex justify-between px-10">
        <p className="">Profile picture:</p>
        <img
          className="w-[117px]"
          src={
            blacklist?.merchant?.profilePhoto
              ? blacklist?.merchant?.profilePhoto
              : PlaceholderImage
          }
        />
      </div>

      <Details
        title="Business Name:"
        value={capitalizeFirstLetter(
          blacklist?.merchant?.fullname ? blacklist?.merchant?.fullname : "N/A"
        )}
      />

      <Details
        title="Phone number:"
        value={blacklist?.merchant?.phone ? blacklist?.merchant?.phone : "N/A"}
      />

      <Details
        title="Email address:"
        value={blacklist?.merchant?.email ? blacklist?.merchant?.email : "N/A"}
      />

      <Details
        title="Social media platform:"
        value={
          blacklist?.merchant?.socialMediaPlatform
            ? blacklist?.merchant?.socialMediaPlatform
            : "N/A"
        }
      />

      <Details
        title="Social media handle:"
        value={
          blacklist?.merchant?.socialMediaHandle
            ? blacklist?.merchant?.socialMediaHandle
            : "N/A"
        }
      />

      <Details
        title="Bank name:"
        value={
          blacklist?.merchant?.bankName ? blacklist?.merchant?.bankName : "N/A"
        }
      />

      <Details
        title="Bank account number:"
        value={
          blacklist?.merchant?.bankAccountNumber
            ? blacklist?.merchant?.bankAccountNumber
            : "N/A"
        }
      />

      <Details
        title="Date Joined:"
        value={formatDate(
          blacklist?.merchant?.created_at
            ? blacklist?.merchant?.created_at
            : "N/A"
        )}
      />

      <div className="flex justify-between px-10 mt-4">
        <p className="">Account status:</p>
        <p
          className="text-[12px] w-20 h-4 text-center rounded-md"
          style={{
            backgroundColor: getStatusColor(
              blacklist?.merchant?.status ? blacklist?.merchant?.status : "N/A"
            ),
          }}
        >
          {capitalizeFirstLetter(
            blacklist?.merchant?.status ? blacklist?.merchant?.status : "N/A"
          )}
        </p>
      </div>

      <div className="flex gap-8 justify-center items-center mt-5 px-8">
        <Button size="lg" variant="secondary" onClick={handleDelete}>
          {loading ? (
            <CircleLoader color="#0979A1" loading={loading} size={20} />
          ) : (
            " Reinstate"
          )}
        </Button>
      </div>
    </section>
  );
};

export default Details;
