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
  const [activeTab, setActiveTab] = useState<"merchant" | "buyer">(
    (localStorage.getItem("activeTab") as "merchant" | "buyer") || "merchant"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { makeRequest } = useRequest("/users", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const { makeRequest: getStat } = useRequest("/users/statistics", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const openNotification = () => {
    setModalVisible(true);
  };

  const updateUrlParams = (params: { [key: string]: string | number }) => {
    const url = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key].toString());
    });
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const storedSearchQuery = params.get("search") || "";
    const storedStatus = params.get("status") || "";
    const storedUserType = params.get("userType") || activeTab;

    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    setActiveTab(storedUserType as "merchant" | "buyer");
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStat();
      setStatistics(response.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
      userType: activeTab,
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const params: {
      limit: number;
      page: number;
      search?: string;
      status?: string;
      userType?: string;
    } = {
      limit,
      page,
    };

    if (activeTab === "merchant") {
      params.userType = "merchant";
    } else if (activeTab === "buyer") {
      params.userType = "buyer";
    }

    if (selectedStatus) {
      params.status = selectedStatus;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }

    const [response] = await makeRequest(undefined, params);
    setData(response.data?.users || []);
    setTotalPages(Math.ceil(response.data?.totalPages));
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Icon name="downloadIcon" />

          <button className="-mt-3" onClick={openNotification}>
            <Icon name="notificationIcon" />
          </button>
        </section>
      </div>
      <div className="flex justify-between">
        <Tabs
          activeTab={activeTab}
          tabs={["merchant", "buyer"]}
          setActiveTab={setActiveTab}
        />
      </div>
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <NotificationModal
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default Dashboard;
