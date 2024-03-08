import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import PlaceholderImage from "../../../assets/Ellipse 5.svg";
import { CircleLoader } from "react-spinners";
import Button from "../../../components/button";
import SuspendUser from "./suspend";
import BlockUser from "./lock";
import UserTransactionDetails from "./user-transaction-details";

interface DetailsProps {
  account: {
    id: string;
    balance: number;
    fullname: string;
    bankAccountNumber: number;
    email: string;
    bankName: string;
    status: string;
    created_at: string;
    orderId: string;
    password: string;
    phone: string;
    profilePhoto: string;
    socialMediaHandle: string;
    socialMediaPlatform: string;
  };
}

const Details: React.FC<DetailsProps> = ({ account }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lockKModalVisible, setLockModalVisible] = useState(false);
  const [loading, setLoading] = useState();
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

  const handleSuspendClick = () => {
    setModalVisible(true);
  };

  const handleLockClick = () => {
    setLockModalVisible(true);
  };

  const Details = ({ title, value, img }: any) => {
    return (
      <div className="flex justify-between px-6 mt-4">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex justify-between gap-10">
      <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full">
        <div className="flex justify-between px-6">
          <p className="">Profile picture:</p>
          <img
            className="w-[117px]"
            src={
              account?.profilePhoto ? account?.profilePhoto : PlaceholderImage
            }
          />
        </div>

        <Details
          title="Full Name:"
          value={capitalizeFirstLetter(
            account?.fullname ? account?.fullname : "N/A"
          )}
        />

        <Details
          title="Phone number:"
          value={account?.phone ? account?.phone : "N/A"}
        />

        <Details
          title="Email address:"
          value={account?.email ? account?.email : "N/A"}
        />

        <Details
          title="Social media platform:"
          value={
            account?.socialMediaPlatform ? account?.socialMediaPlatform : "N/A"
          }
        />

        <Details
          title="Social media handle:"
          value={
            account?.socialMediaHandle ? account?.socialMediaHandle : "N/A"
          }
        />

        <Details
          title="Bank name:"
          value={account?.bankName ? account?.bankName : "N/A"}
        />

        <Details
          title="Bank account number:"
          value={
            account?.bankAccountNumber ? account?.bankAccountNumber : "N/A"
          }
        />

        <Details
          title="Date Joined:"
          value={formatDate(account?.created_at ? account?.created_at : "N/A")}
        />

        <div className="flex justify-between px-6 mt-4">
          <p className="">Account status:</p>
          <p
            className="text-[12px] w-20 h-4 text-center rounded-md"
            style={{
              backgroundColor: getStatusColor(
                account?.status ? account?.status : "N/A"
              ),
            }}
          >
            {capitalizeFirstLetter(account?.status ? account?.status : "N/A")}
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-10 px-6">
          <Button
            size="lg"
            variant="secondary"
            type="submit"
            onClick={handleSuspendClick}
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Suspend account"
            )}
          </Button>

          <Button
            size="lg"
            variant="primary"
            type="submit"
            onClick={handleLockClick}
            className="mt-5"
          >
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Block account"
            )}
          </Button>
        </div>

        <SuspendUser
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
          account={account}
        />

        <BlockUser
          visible={lockKModalVisible}
          handleClose={() => setLockModalVisible(false)}
          account={account}
        />
      </div>

      <UserTransactionDetails account={account} />
    </div>
  );
};

export default Details;