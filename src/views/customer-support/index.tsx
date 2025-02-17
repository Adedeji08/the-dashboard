import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Tabs from "../../components/tab";
import useRequest from "../../components/hooks/use-request";
import Requests from "./support/requests";
import Pagination from "../../components/pagination/pagination";
import Agents from "./agents/agents";

interface UserData {
  fullname: string;
}

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState<"requests" | "agents">(
    (localStorage.getItem("activeTab") as "requests" | "agents") || "requests"
  );
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [data, setData] = useState<UserData[]>([]);
  const [agentData, setAgentData] = useState<UserData[]>([]);
  const [statistics, setStatistics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { makeRequest } = useRequest("/customer-support/tickets", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: getAgent } = useRequest(
    "/customer-support/agents",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const { makeRequest: getStats } = useRequest(
    "/customer-support/statistics",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

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
    const storedUserType = params.get("type") || activeTab;

    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    setActiveTab(storedUserType as "requests" | "agents");
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
      type: activeTab,
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
      status?: string;
      name?: string;
      search?: string;
    } = {
      limit,
      page,
    };

    if (selectedStatus) {
      params.status = selectedStatus;
    }

    if (searchQuery) {
      params.name = searchQuery;
    }

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (activeTab === "requests") {
      const [response] = await makeRequest(undefined, params);
      setData(response.data?.data?.tickets || []);
      setTotalPages(Math.ceil(response.data?.data?.totalPages));
    } else if (activeTab === "agents") {
      const [response] = await getAgent(undefined, params);
      setAgentData(response.data?.agents || []);
      setTotalPages(Math.ceil(response.data?.totalPages));
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStats();
      setStatistics(response.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Customer support{" "}
            <p className="text-[14px] font-normal">
              See all customer support requests
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
          <Icon name="notificationIcon" />
        </section>
      </div>

      <Tabs
        activeTab={activeTab}
        tabs={["requests", "agents"]}
        setActiveTab={setActiveTab}
      />

      {activeTab === "requests" && (
        <Requests
          data={data}
          statistics={statistics}
          selectedStatus={selectedStatus}
          handleStatusChange={handleStatusChange}
        />
      )}

      {activeTab === "agents" && <Agents data={agentData} />}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomerSupport;
