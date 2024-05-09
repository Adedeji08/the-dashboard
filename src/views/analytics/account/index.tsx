import React from "react";
import Icon from "../../../assets/icons";
import AnalyticsChart from "../../../components/graph/analytics-chart";

const AccountChart = () => {
  return (
    <>
      <div className="bg-white border border-white h-96 mt-10 rounded-md w-[880px]">
        <section className="flex justify-between">
          <div className="flex gap-2 px-10 py-6">
            <Icon name="accountchart" />
            <p className="text-[14px] font-medium">
              Account <br />
              <span className="text-[10px] font-normal">
                Number of users that signed up per month
              </span>
            </p>
          </div>

          <div className=" px-10 py-6">
          
              <div className="flex gap-2">
                <select
                  className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
                  // value={selectedStatus}
                  // onChange={handleStatusChange}
                >
                  <option value="active">This year</option>
                  <option value="suspended">This month</option>
                  <option value="inactive">This week</option>
                  <option value="blocked">Today</option>
                </select>
            </div>
          </div>
        </section>
        <AnalyticsChart />
      </div>
    </>
  );
};

export default AccountChart;
