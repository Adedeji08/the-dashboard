import React, { useEffect, useState } from "react";
import Tabs from "../../components/tab";
import Buyer from "./buyer";
import Merchant from "./merchant";
import useRequest from "../../components/hooks/use-request";
import Icon from "../../assets/icons";
import Pagination from "../../components/pagination/pagination";
import NotificationModal from "../notification/notification-modal";
import AddAdmin from "./admin/add-admin";

interface UserData {
  fullname: string;
}

const Dashboard = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [adminModal, setAdminModal] = useState(false);
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

  const openAdmin = () => {
    setAdminModal(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const params: {
      limit: number;
      page: number;
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

    const [response] = await makeRequest(undefined, params);
    setData(response.data?.users || []);
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

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStat();
      setStatistics(response.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Add this useEffect hook to set the active tab to "reports" when the component mounts
  useEffect(() => {
    setActiveTab("merchant");
  }, []);

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
      <div className="flex justify-between">
        <Tabs
          activeTab={activeTab}
          tabs={["merchant", "buyer"]}
          setActiveTab={setActiveTab}
        />

        <div className="rounded-md solid px-8 mx-14 mt-10 bg-[#0979A1] h-[45px] flex gap-3">
          <Icon name="addition" className="mt-2 rounded" />
          <button
            className={` h-[43px] font-bold text-[#fff] rounded-md`}
            type="submit"
            onClick={openAdmin}
          >
            Add Admin
          </button>
        </div>
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

      <AddAdmin visible={adminModal} handleClose={() => setAdminModal(false)} />
    </>
  );
};

export default Dashboard;
