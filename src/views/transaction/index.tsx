import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Tabs from "../../components/tab";
import useRequest from "../../components/hooks/use-request";
import Payments from "./transact/payments";
import Withdrawal from "./transact/withdrawal";
import Pagination from "../../components/pagination/pagination";
import NotificationModal from "../notification/notification-modal";

interface UserData {
  fullname: string;
}

const Transaction = () => {
  const [activeTab, setActiveTab] = useState<"payment" | "withdrawal">(
    (localStorage.getItem("activeTab") as "payment" | "withdrawal") || "payment"
  );
  const [data, setData] = useState<UserData[]>([]);
  const [statistics, setStatistics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [selectedStatus, setSelectedStatus] = useState<string>("successful");
  const [modalVisible, setModalVisible] = useState(false);
  const { makeRequest } = useRequest("/transactions", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: getStat } = useRequest(
    "/transactions/statistics",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const [response] = await makeRequest(undefined, {
      email: searchQuery,
      type: activeTab,
      status: selectedStatus,
      limit,
      page,
    });
    setData(response.data?.transactions || []);
    setTotalPages(Math.ceil(response.data?.totalPages));
  };

  function handlePageChange(page: number) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    url.search = params.toString();
    window.location.href = url.toString();
    setCurrentPage(page);
  }

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  //Statistics
  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStat();
      setStatistics(response.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNotification = () => {
    setModalVisible(true);
  };
  
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    setActiveTab("payment");
  }, []);

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Transactions{" "}
            <p className="text-[14px] font-normal">See all transactions</p>
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
        tabs={["payment", "withdrawal"]}
        setActiveTab={setActiveTab}
      />

      {activeTab === "payment" && (
        <Payments
          data={data}
          statistics={statistics}
          selectedStatus={selectedStatus}
          handleStatusChange={handleStatusChange}
        />
      )}

      {activeTab === "withdrawal" && (
        <Withdrawal
          data={data}
          statistics={statistics}
          selectedStatus={selectedStatus}
          handleStatusChange={handleStatusChange}
        />
      )}

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

export default Transaction;
