import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Tabs from "../../components/tab";
import useRequest from "../../components/hooks/use-request";
import Reports from "./reports/reports";
import BlacklistedReport from "./reports/blacklist";
import Pagination from "../../components/pagination/pagination";

interface UserData {
  fullname: string;
}

const BlackList = () => {
  const [activeTab, setActiveTab] = useState<"reports" | "blacklist">(
    "reports"
  );
  const [data, setData] = useState<UserData[]>([]);
  const [blacklist, setBlacklist] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 20;
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

  useEffect(() => {
    fetchData();
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
      setTotalPages(Math.ceil(response.data?.totalPages / itemsPerPage));
    } else if (activeTab === "blacklist") {
      const [response] = await getBlacklist(undefined, {
        search: searchQuery,
        limit,
        page,
      });
      setBlacklist(response.data?.blacklists || []);
      setTotalPages(Math.ceil(response.data?.totalPages / itemsPerPage));
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchData();
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Blacklist{" "}
            <p className="text-[14px] font-normal">
              Review content uploaded by verified users
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
        tabs={["reports", "blacklist"]}
        setActiveTab={setActiveTab}
      />

      {activeTab === "reports" && <Reports data={data} />}

      {activeTab === "blacklist" && <BlacklistedReport blacklist={blacklist} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default BlackList;
