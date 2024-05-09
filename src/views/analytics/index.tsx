import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import NotificationModal from "../notification/notification-modal";
import useRequest from "../../components/hooks/use-request";
import AccountChart from "./account";

interface ChartData {
  name: string;
}
const Analytics = () => {
  const userToken = localStorage.getItem("token");
  const [modalVisible, setModalVisible] = useState(false);
  const [accountChart, setAccountChart] = useState<ChartData[]>([]);
  const [accountTotal, setAccountTotal] = useState<ChartData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("day");
  const [payments, setPayments] = useState<any[]>([]);
  const openNotification = () => {
    setModalVisible(true);
  };
  const { makeRequest } = useRequest("/users/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchData = async () => {
    const [response] = await makeRequest(undefined, {
      filter: selectedFilter,
    });
    setAccountTotal(response.data || [])
    setAccountChart(response.data?.graph || []);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between w-[95%]">
        <section>
          <h2 className="text-[24px] font-bold">
            Analytics{" "}
            <p className="text-[14px] font-normal">
              See all statistics and analytics{" "}
            </p>
          </h2>
        </section>

        <section className="flex gap-4">
          <div className="rounded-md solid px-8 bg-[#0979A1] h-[45px] flex gap-3">
            <Icon name="msgIcon" className="mt-3 rounded" />
            <button
              className={` h-[43px] font-bold text-[#fff] rounded-md`}
              type="submit"
            >
              Download Report
            </button>
          </div>
          <button className="-mt-3" onClick={openNotification}>
            <Icon name="notificationIcon" />
          </button>
        </section>
      </div>

      <NotificationModal
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />

      <AccountChart
       chartdata={accountChart}
       accountTotal={accountTotal}
       selectedFilter={selectedFilter}
       handleStatusChange={handleStatusChange}
      />
    </>
  );
};

export default Analytics;
