import React from "react";
import PlaceholderImage from "../../../assets/Ellipse 5.svg";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";

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

    </section>
  );
};

export default Details;
