import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Mediator from "./mediate/mediator";
import useRequest from "../../components/hooks/use-request";
import AddMediator from "./mediate/add-mediator";
import Pagination from "../../components/pagination/pagination";
import NotificationModal from "../notification/notification-modal";
import Tabs from "../../components/tab";
import MediatorList from "./mediators/mediators";

interface UserData {
  channels: {
    fullname: string;
  };
}

const Mediation = () => {
  const [activeTab, setActiveTab] = useState<"requests" | "mediators">(
    (localStorage.getItem("activeTab") as "requests" | "mediators") ||
      "requests"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const [data, setData] = useState<UserData>();
  const [mediators, setMediators] = useState<UserData>();
  const [statistics, setStatistics] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/mediation", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getMediators } = useRequest(
    `/mediation/mediators`,
    "GET",
    { userToken }
  );

  const { makeRequest: getStatistics } = useRequest(
    "/mediation/channels/statistics",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const [modalNotifyVisible, setModalNotifyVisible] = useState(false);

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
    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const params: {
      // limit: number;
      // page: number;
      status?: string;
      title?: string;
      caseID?: string;
      email?: string;
      fullName?: string;
    } = {
      // limit,
      // page,
    };
    if (selectedStatus) {
      params.status = selectedStatus;
    }

    if (searchQuery) {
      if (
        searchQuery.startsWith("#") &&
        !isNaN(Number(searchQuery.substring(1)))
      ) {
        params.caseID = searchQuery;
      } else {
        params.title = searchQuery;
      }
    }

    if (activeTab === "requests") {
      const [response] = await makeRequest(undefined, params);
      setData(response.data?.channels || []);
      setTotalPages(Math.ceil(response.data?.totalPages));
    } else if (activeTab === "mediators") {
      const [response] = await getMediators(undefined, params);
      setMediators(response?.data?.mediators || []);
      setTotalPages(Math.ceil(response.data?.totalPages));
    }
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

  const addMediator = () => {
    setModalVisible(true);
  };

  const openNotification = () => {
    setModalNotifyVisible(true);
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

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Mediation Requests{" "}
            <p className="text-[14px] font-normal">
              See all mediation requests from users
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

      <div className="flex justify-between pr-10">
        <Tabs
          activeTab={activeTab}
          tabs={["requests", "mediators"]}
          setActiveTab={setActiveTab}
        />

        {activeTab === "mediators" && (
          <button
            className="h-[50px] mt-8 w-[200px]  border-2 border-[#0979A1] text-[#0979A1] rounded-md font-bold text-[12px] "
            onClick={addMediator}
          >
            Add A Mediator
          </button>
        )}
      </div>

      {activeTab === "requests" && (
        <Mediator
          data={data}
          statistics={statistics}
          selectedStatus={selectedStatus}
          handleStatusChange={handleStatusChange}
        />
      )}

      {activeTab === "mediators" && <MediatorList data={mediators} />}

      <AddMediator
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <NotificationModal
        visible={modalNotifyVisible}
        handleClose={() => setModalNotifyVisible(false)}
      />
    </>
  );
};

export default Mediation;
