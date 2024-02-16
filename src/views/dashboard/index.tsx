import React, { useEffect, useState } from "react";
import Tabs from "../../components/tab";
import Buyer from "./buyer";
import Merchant from "./merchant";
import useRequest from "../../components/hooks/use-request";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/users", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest(undefined, { userType: activeTab });
      setData(response.data?.users || []);
    };

    fetchData();
  }, [activeTab]);

  return (
    <div>
      Dashboard
      <Tabs
        activeTab={activeTab}
        tabs={["merchant", "buyer"]}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "merchant" && <Merchant data={data} />}
        {activeTab === "buyer" && <Buyer data={data}/>}
      </div>
    </div>
  );
};

export default Dashboard;
