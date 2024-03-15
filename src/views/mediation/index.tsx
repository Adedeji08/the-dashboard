import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import Mediator from "./mediate/mediator";
import useRequest from "../../components/hooks/use-request";
import AddMediator from "./mediate/add-mediator";
import Pagination from "../../components/pagination/pagination";

interface UserData {
  channels: {
    fullname: string;
  };
}

const Mediation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const [data, setData] = useState<UserData>();
  const [statistics, setStatistics] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/mediation", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getStatistics } = useRequest(
    "/mediation/channels/statistics",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const [response] = await makeRequest(undefined, {
      caseID: searchQuery,
      title: searchQuery,
      status: selectedStatus,
      limit,
      page,
    });
    setData(response.data?.channels || []);
    setTotalPages(Math.ceil(response.data?.totalPages));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData();
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const addMediator = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getStatistics();
      setStatistics(response.data);
    };

    fetchData();
  }, []);

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
              placeholder="Search for title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Icon name="msgIcon" />
          <Icon name="notificationIcon" />
        </section>
      </div>

      <button
        className="h-[50px] mt-8 w-[300px] bg-[#0979A1] text-white rounded-md font-bold text-[12px] "
        onClick={addMediator}
      >
        Add A Mediator
      </button>

      <Mediator
        data={data}
        statistics={statistics}
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />

      <AddMediator
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Mediation;
