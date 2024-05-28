import React, { useEffect, useState } from "react";
import Back from "../../../components/back";
import { useParams } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Details from "./admin-details";
//import Details from "./details";

interface DetailsProps {
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
}

const AdminDetails = () => {
  const [admin, setAdmin] = useState<DetailsProps>({
    id: "",
    fullname: "",
    email: "",
    referralLink: "",
    status: "",
    created_at: "",
    orderId: "",
    password: "",
    phone: "",
    profilePhoto: "",
    userType: "",
  });

  const { id } = useParams<{ id: string }>();
  const { makeRequest: getAdminById, loading } = useRequest(`/users/${id}`, "GET");

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getAdminById();
      setAdmin(response?.data || []);
  
    };
    fetchData();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <>
      <div className="flex justify-between items-end w-[95%]">
        <div className="flex gap-5 mt-5">
          <Back />
          <h2 className="text-[24px] font-bold">Admin Details</h2>
        </div>
      </div>
      {
        loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )
      }
      <Details admin={admin} />
    </>
  );
};

export default AdminDetails;
