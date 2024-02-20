import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Details from "./details";

const AccountDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams<{ id: string }>();

  const { makeRequest: getAccount } = useRequest("/users", "GET");

  const selectedOrder = (data as any[]).find(
    (account) => account.id === id
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getAccount();
      setData(response?.data?.users || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Accounts Details</h2>
      </div>
      <Details account={selectedOrder} />
    </>
  );
};

export default AccountDetails;
