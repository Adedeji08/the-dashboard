import React, { useEffect, useState } from "react";
import Tabs from "../../components/tab";
import Buyer from "./buyer";
import Merchant from "./merchant";
import useRequest from "../../components/hooks/use-request";
import Icon from "../../assets/icons";
import Pagination from "../../components/pagination/pagination";
import NotificationModal from "../notification/notification-modal";

interface UserData {
  fullname: string;
}

const Dashboard = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [statistics, setStatistics] = useState([]);
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">("merchant");
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const { makeRequest } = useRequest("/users", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const { makeRequest: getStat } = useRequest("/users/statistics", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const openNotification = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const [response] = await makeRequest(undefined, {
      userType: activeTab,
      search: searchQuery,
      status: selectedStatus,
      page,
      limit,
    });
    setData(response.data?.users || []);
    setTotalPages(Math.ceil(response.data?.totalPages));
  };
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStat();
      setStatistics(response.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData();
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
          
          <button className="-mt-3" onClick={openNotification}>
          <Icon name="notificationIcon" />
          </button>
        </section>
      </div>
      <Tabs
        activeTab={activeTab}
        tabs={["merchant", "buyer"]}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "merchant" && (
          <Merchant
            data={data}
            activeTab={activeTab}
            statistics={statistics}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
          />
        )}
        {activeTab === "buyer" && (
          <Buyer
            data={data}
            activeTab={activeTab}
            statistics={statistics}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <NotificationModal
       visible={modalVisible}
       handleClose={() => setModalVisible(false)}
       />
    </>
  );
};

export default Dashboard;
