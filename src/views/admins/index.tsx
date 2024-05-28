import React, { useEffect, useState } from "react";
import AddAdmin from "../dashboard/admin/add-admin";
import Icon from "../../assets/icons";
import AdminTable from "./admin-table";
import useRequest from "../../components/hooks/use-request";
import Pagination from "../../components/pagination/pagination";

interface Roles {
  name: string;
  id: string;
}

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

  const { makeRequest: getRoles } = useRequest(`/roles`, "GET");

  const [roles, setRoles] = useState<Roles[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getRoles(undefined);
      const sortedRoles =
        response?.data?.roles?.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        ) || [];

      setRoles(sortedRoles);
    };
    fetchData();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };
  function handlePageChange(page: number) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    url.search = params.toString();
    window.location.href = url.toString();
    setCurrentPage(page);
  }

const fetchData = async () => {
  const page = currentPage;
  const limit = itemsPerPage;
  const params: {
    limit: number;
    page: number;
    role?: string;
    search?: string;
  } = {
    limit,
    page,
  };
  if (selectedRole) {
    params.role = selectedRole;
  }
  if (searchQuery) {
    params.search = searchQuery;
  }
  const [response] = await makeRequest(undefined, params);
  setData(response.data?.admins || []);

  setTotalPages(Math.ceil(response.data?.totalPages));
};

  useEffect(() => {
    fetchData();
    
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [searchQuery,selectedRole ]);

  

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
      <div className="rounded-md py-3 px-3 bg-white border border-[#fff] mt-10 w-[95%] pt-5">
        <div className="flex  justify-between">
          <p className="text-[18px] font-semibold"> Select All</p>
          <div>
            <div className="flex gap-5 items-center">
              <div className="border-2 rounded-md solid pl-5 bg-transparent  h-[45px] flex gap-3">
                <Icon name="searchIcon" className="mt-3 rounded" />
                <input
                  className="outline-none border-none w-[80%] bg-transparent"
                  id="input-placeholder"
                  placeholder="Search"
                  value={searchQuery}
              onChange={handleSearchChange}
                />
              </div>
              <div className="flex gap-2">
                <span className="text-[14px] font-medium">Filter by:</span>
                <select
                  className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
                  value={selectedRole}
                  onChange={handleStatusChange}
                >
                  <option value="">all</option>
                  {roles.map((role) => (
                    <option value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <AdminTable data={data} selectedRole={selectedRole} />
      </div>

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
