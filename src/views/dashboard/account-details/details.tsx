import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../utilities/functions";
import PlaceholderImage from "../../../assets/Ellipse 5.svg";
import { CircleLoader } from "react-spinners";
import Button from "../../../components/button";
import Suspend from "./suspend";
import Lock from "./lock";
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

        <div className="flex justify-between px-6 mt-4">
          <p className="">Full Name:</p>
          <p className="">
            {capitalizeFirstLetter(
              account?.fullname ? account?.fullname : "N/A"
            )}
          </p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Phone number:</p>
          <p className="text-left">{account?.phone ? account?.phone : "N/A"}</p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Email Address:</p>
          <p className="">{account?.email ? account?.email : "N/A"}</p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Social media platform:</p>
          <p className="">
            {account?.socialMediaPlatform
              ? account?.socialMediaPlatform
              : "N/A"}
          </p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Social media handle:</p>
          <p className="">
            {account?.socialMediaHandle ? account?.socialMediaHandle : "N/A"}
          </p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Bank name:</p>
          <p className="">{account?.bankName ? account?.bankName : "N/A"}</p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Bank account number:</p>
          <p className="">
            {account?.bankAccountNumber ? account?.bankAccountNumber : "N/A"}
          </p>
        </div>

        <div className="flex justify-between px-6 mt-4">
          <p className="">Date Joined:</p>
          <p className="">
            {formatDate(account?.created_at ? account?.created_at : "N/A")}
          </p>
        </div>

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
              "Lock account"
            )}
          </Button>
        </div>

        <Suspend
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
        />

        <Lock
          visible={lockKModalVisible}
          handleClose={() => setLockModalVisible(false)}
        />
      </div>

      <UserTransactionDetails account={account} />
    </div>
  );
};

export default Details;
