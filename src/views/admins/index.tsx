import React, { useEffect, useState } from "react";
import AddAdmin from "../dashboard/admin/add-admin";
import Icon from "../../assets/icons";
import AdminTable from "./admin-table";
import useRequest from "../../components/hooks/use-request";
import Pagination from "../../components/pagination/pagination";

const Admins = () => {
  const userToken = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [adminModal, setAdminModal] = useState(false);

  const params = new URLSearchParams(new URL(window.location.href).search);

  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page") || 1)
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  const { makeRequest } = useRequest("/admin", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  function handlePageChange(page: number) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    url.search = params.toString();
    window.location.href = url.toString();
    setCurrentPage(page);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const params: {
      limit: number;
      page: number;
    } = {
      limit,
      page,
    };

    const [response] = await makeRequest(params);
    setData(response.data?.admins || []);
    setTotalPages(Math.ceil(response.data?.totalPages));
    console.log(response.data);
  };

  const openAdmin = () => {
    setAdminModal(true);
  };
  return (
    <>
      <div className="flex justify-between items-end w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            All Admins
            <p className="text-[14px] font-normal">Select Preferred Admin</p>
          </h2>
        </section>

        <section>
          <div
            onClick={openAdmin}
            className="rounded-md solid px-8 mx-14 mt-10 bg-[#0979A1] h-[45px] flex gap-3 cursor-pointer"
          >
            <Icon name="addition" className="mt-2 rounded" />
            <button
              className={` h-[43px] font-bold text-[#fff] rounded-md`}
              type="submit"
            >
              Add Admin
            </button>
          </div>
        </section>
      </div>

      <AdminTable data={data} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <AddAdmin visible={adminModal} handleClose={() => setAdminModal(false)} />
    </>
  );
};

export default Admins;
