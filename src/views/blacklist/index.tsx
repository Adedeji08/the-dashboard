import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Tabs from "../../components/tab";
import useRequest from "../../components/hooks/use-request";
import Reports from "./reports/reports";
import BlacklistedReport from "./reports/blacklist";
import Pagination from "../../components/pagination/pagination";
import NotificationModal from "../notification/notification-modal";

interface UserData {
  fullname: string;
}

const BlackList = () => {
  const [activeTab, setActiveTab] = useState<"reports" | "blacklist">(
    (localStorage.getItem("activeTab") as "reports" | "blacklist") || "reports"
  );

  const [data, setData] = useState<UserData[]>([]);
  const [blacklist, setBlacklist] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statistics, setStatistics] = useState([]);
  const userToken = localStorage.getItem("token");
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const [modalVisible, setModalVisible] = useState(false);

  const { makeRequest: getStatistics } = useRequest(
    "/reports/statistic",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { makeRequest: getReports } = useRequest("/reports", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getBlacklist } = useRequest(
    "/reports/blacklist",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const openNotification = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    if (activeTab === "reports") {
      const [response] = await getReports(undefined, {
        search: searchQuery,
        limit,
        page,
      });
      setData(response.data?.reports || []);
      setTotalPages(Math.ceil(response.data?.totalPages));
    } else if (activeTab === "blacklist") {
      const [response] = await getBlacklist(undefined, {
        search: searchQuery,
        limit,
        page,
      });
      setBlacklist(response.data?.blacklists || []);
      setTotalPages(Math.ceil(response.data?.totalPages));
    }
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

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStatistics();
      setStatistics(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Add this useEffect hook to set the active tab to "reports" when the component mounts
  useEffect(() => {
    setActiveTab("reports");
  }, []);

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Blacklist{" "}
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
        tabs={["reports", "blacklist"]}
        setActiveTab={setActiveTab}
      />

      {activeTab === "reports" && (
        <Reports data={data} statistics={statistics} />
      )}

      {activeTab === "blacklist" && <BlacklistedReport blacklist={blacklist} />}
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

export default BlackList;
