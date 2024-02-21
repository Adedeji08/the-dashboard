import React, { useState, useEffect } from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import logo from "../../assets/logo.png";
import classNames from "classnames";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { id } = useParams();
  const sidebarBackgroundCheck = pathname.split("/")[1];

  useEffect(() => {
    if (
      sidebarBackgroundCheck === "" ||
      sidebarBackgroundCheck === "dashboard" ||
      sidebarBackgroundCheck === "transactions" ||
      sidebarBackgroundCheck === "mediation-request" ||
      sidebarBackgroundCheck === "recommendation" ||
      sidebarBackgroundCheck === "account" ||
      sidebarBackgroundCheck === "refunds"
    ) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sidebarBackgroundCheck]);


  return (
    <div className="max-w-1500 mx-auto flex flex-col md:flex-row">
      <aside
       className={classNames(
        "bg-gray-100 overflow-y-scroll transition-all duration-300 h-[100vh] border-r border-gray-200",
        {
          "w-60": sidebarOpen,
          "w-0": !sidebarOpen,
        }
      )}
      >
        <div className="p-4">
          <img src={logo} alt="logo" />
        </div>
        <Sidebar open={sidebarOpen} />
      </aside>
      <main
        className={classNames (
       "pr-2 py-2 md:py-5 flex-grow overflow-y-scroll transition-all duration-300",
       {
        "pl-16": sidebarOpen,
        "pl-2 md:pl-3.5": !sidebarOpen,
      }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
