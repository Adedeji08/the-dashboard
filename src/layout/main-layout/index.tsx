import React, { useState, useEffect } from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import logo from "../../assets/logo.png";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { id } = useParams();
  const newCheck = pathname.split("/")[1];

  useEffect(() => {
    if (
      newCheck === "account" ||
      newCheck === "dashboard" ||
      newCheck === "support" ||
      newCheck === "mediation" ||
      newCheck === "mediation-request" ||
      newCheck === "recommendation"
    ) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [newCheck]);

  return (
    <div className="max-w-1500 mx-auto flex flex-col md:flex-row">
      {/* <div className="sticky top-16 h-1 bg-gray-200"></div> */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-0"
        } bg-gray-100 overflow-y-scroll transition-all duration-300 h-[100vh] border-r border-gray-200`}
      >
        <div className="p-4">
          <img src={logo} alt="logo" />
        </div>
        <Sidebar open={sidebarOpen} />
      </aside>
      <main
        className={`${
          sidebarOpen ? "pl-32" : "pl-2 md:pl-3.5"
        } pr-2 py-2 md:py-5 flex-grow overflow-y-scroll transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
