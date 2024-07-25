import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Details from "./details";

interface DetailsProps {
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
    userType: string;
}

const AccountDetails = () => {
  const [account, setAccount] = useState<DetailsProps>({
    id: "",
    balance: 0,
    fullname: "",
    bankAccountNumber: 0,
    email: "",
    bankName: "",
    status: "",
    created_at: "",
    orderId: "",
    password: "",
    phone: "",
    profilePhoto: "",
    socialMediaHandle: "",
    socialMediaPlatform: "",
    userType: ""
  });
  
  const { id } = useParams<{ id: string }>();
  const { makeRequest: getAccountById } = useRequest(`/users/${id}`, "GET");

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getAccountById();
      setAccount(response?.data || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Accounts Details</h2>
      </div>
      <Details account={account} />
    </>
  );
};

export default AccountDetails;
