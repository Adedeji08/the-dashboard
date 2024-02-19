import React, { useEffect, useState } from "react";
import Tabs from "../../components/tab";
import Buyer from "./buyer";
import Merchant from "./merchant";
import useRequest from "../../components/hooks/use-request";
import Icon from "../../assets/icons";

interface UserData {
 fullname: string;
}

const Dashboard = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [stat, setStat] = useState([]);
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const { makeRequest } = useRequest("/users", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getStat } = useRequest("/users/statistics", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    fetchData();
  }, [activeTab, searchQuery]);

  const fetchData = async () => {
    const [response] = await makeRequest(undefined, { 
      userType: activeTab,
      search: searchQuery,
      status: selectedStatus,
    });
    setData(response.data?.users || []);
  };

const handleSearchChange = (event:any) => {
  setSearchQuery(event.target.value);
};

useEffect(() => {
  const fetchData = async () => {
    const [response] = await getStat();
    setStat(response.data);
  };

  fetchData();
}, []);

const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedStatus(event.target.value);
};


  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Accounts{" "}
            <p className="text-[14px] font-normal">
              See all the accounts / profiles of users
            </p>
          </h2>
        </section>

        <section className="flex gap-4">
          <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
            <Icon name="searchIcon" className="mt-3 rounded" />
            <input
              className="outline-none border-none w-[80%] bg-transparent"
              id="input-placeholder"
              placeholder="Search for name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Icon name="msgIcon" />
          <Icon name="notificationIcon" />
        </section>

      </div>
      <Tabs
        activeTab={activeTab}
        tabs={["merchant", "buyer"]}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "merchant" && <Merchant data={data} stat={stat} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}  />}
        {activeTab === "buyer" && <Buyer data={data} stat={stat} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />}
      </div>
    </>
  );
};

export default Dashboard;
