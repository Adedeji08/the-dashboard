import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import RefundTable from "./refund-table";
import useRequest from "../../components/hooks/use-request";
import Pagination from "../../components/pagination/pagination";

interface UserData {
  channels: {
    fullname: string;
  };
}

const Refund = () => {
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const [refunds, setRefund] = useState<UserData>();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/orders/refunds", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

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
  }, [searchQuery, selectedStatus, currentPage]);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const params: {
      limit: number;
      page: number;
      status?: string;
      title?: string;
      caseID?: string;
    } = {
      limit,
      page,
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

    const [response] = await makeRequest(undefined, params);
    setRefund(response.data?.requests || []);
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

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Refund Requests{" "}
            <p className="text-[14px] font-normal">
              See all Refunds Requests from Buyers
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
          <Icon name="downloadIcon" />
          <Icon name="notificationIcon" />
        </section>
      </div>

      <RefundTable
        refunds={refunds}
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />

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

export default Refund;
