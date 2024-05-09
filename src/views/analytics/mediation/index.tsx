import React from "react";
import Icon from "../../../assets/icons";
import AnalyticsChart from "../../../components/graph/analytics-chart";

const MediationChart = ({
  chartdata,
  selectedFilter,
  handleStatusChange,
  mediationTotal,
}: any) => {
  return (
    <>
      <div className="bg-white border border-white mt-10 rounded-md w-[88%]">
        <section className="flex justify-between">
          <div className="flex gap-2 px-10 py-6">
            <Icon name="mediationchart" />
            <p className="text-[14px] font-medium">
              Mediation <br />
              <span className="text-[10px] font-normal">
                Your mediation requests for this year
              </span>
            </p>
          </div>

          <div className=" px-10 py-6">
            <div className="flex gap-2">
              <select
                className="border text-[12px] px-3 py-1 rounded bg-[#0979A1] text-white"
                value={selectedFilter}
                onChange={handleStatusChange}
              >
                <option value="year">This year</option>
                <option value="month">This month</option>
                <option value="week">This week</option>
                <option value="day">Today</option>
              </select>
            </div>
          </div>
        </section>
        <div className="flex w-full">
          <div className="px-10 py-20 w-1/4">
            <p className="text-[12px]">Total</p>
            <p className="text-[14px] font-medium">{mediationTotal?.total}</p>
            <p
              className={`flex gap-3 text-[12px] py-16 ${
                mediationTotal?.percentageChange < 0
                  ? "text-[#DD0000]"
                  : "text-[#057517]"
              }`}
            >
              <Icon
                name={
                  mediationTotal?.percentageChange < 0
                    ? "percentage-"
                    : "percentage"
                }
              />

              {mediationTotal?.percentageChange}
            </p>
          </div>
          <div className="flex-1">
            {chartdata && Array.isArray(chartdata) && (
              <AnalyticsChart chartdata={chartdata} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediationChart;
