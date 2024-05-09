import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import NotificationModal from "../notification/notification-modal";
import useRequest from "../../components/hooks/use-request";
import AccountChart from "./account";
import OrderChart from "./order";
import PaymentChart from "./payment";
import MediationChart from "./mediation";
import ReportsChart from "./reports";
import SupportChart from "./support";

interface ChartData {
  name: string;
}
const Analytics = () => {
  const userToken = localStorage.getItem("token");
  const [modalVisible, setModalVisible] = useState(false);
  const [accountChart, setAccountChart] = useState<ChartData[]>([]);
  const [accountTotal, setAccountTotal] = useState<ChartData[]>([]);
  const [orderChart, setOrderChart] = useState<ChartData[]>([]);
  const [orderTotal, setOrderTotal] = useState<ChartData[]>([]);
  const [paymentChart, setPaymentChart] = useState<ChartData[]>([]);
  const [paymentTotal, setPaymentTotal] = useState<ChartData[]>([]);
  const [mediationChart, setMediationChart] = useState<ChartData[]>([]);
  const [mediationTotal, setMediationTotal] = useState<ChartData[]>([]);
  const [reportChart, setReportChart] = useState<ChartData[]>([]);
  const [reportTotal, setReportTotal] = useState<ChartData[]>([]);
  const [supportChart, setSupportChart] = useState<ChartData[]>([]);
  const [supportTotal, setSupportTotal] = useState<ChartData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("year");
  const openNotification = () => {
    setModalVisible(true);
  };
  const { makeRequest } = useRequest("/users/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: graphOrder } = useRequest(
    "/orders/transaction-fees/graph",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { makeRequest: graphPayment } = useRequest("/payments/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: graphMediation } = useRequest(
    "/mediation/graph",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { makeRequest: graphReport } = useRequest("/reports/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: graphSupport } = useRequest(
    "/customer-support/graph",
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchData = async () => {
    const [response] = await makeRequest(undefined, {
      filter: selectedFilter,
    });
    setAccountTotal(response.data || []);
    setAccountChart(response.data?.graph || []);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchOrderData = async () => {
    const [response] = await graphOrder(undefined, {
      filter: selectedFilter,
    });
    setOrderTotal(response.data || []);
    setOrderChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchPaymentsData = async () => {
    const [response] = await graphPayment(undefined, {
      filter: selectedFilter,
    });
    setPaymentTotal(response.data || []);
    setPaymentChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchMediationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchMediationData = async () => {
    const [response] = await graphMediation(undefined, {
      filter: selectedFilter,
    });
    setMediationTotal(response.data || []);
    setMediationChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchReportData = async () => {
    const [response] = await graphReport(undefined, {
      filter: selectedFilter,
    });
    setReportTotal(response.data || []);
    setReportChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchSupportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  const fetchSupportData = async () => {
    const [response] = await graphSupport(undefined, {
      filter: selectedFilter,
    });
    setSupportTotal(response.data || []);
    setSupportChart(response.data?.graph || []);
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

      <OrderChart
        chartdata={orderChart}
        orderTotal={orderTotal}
        selectedFilter={selectedFilter}
        handleStatusChange={handleStatusChange}
      />

      <PaymentChart
        chartdata={paymentChart}
        paymentTotal={paymentTotal}
        selectedFilter={selectedFilter}
        handleStatusChange={handleStatusChange}
      />

      <MediationChart
        chartdata={mediationChart}
        mediationTotal={mediationTotal}
        selectedFilter={selectedFilter}
        handleStatusChange={handleStatusChange}
      />

      <ReportsChart
        chartdata={reportChart}
        reportTotal={reportTotal}
        selectedFilter={selectedFilter}
        handleStatusChange={handleStatusChange}
      />

      <SupportChart
        chartdata={supportChart}
        supportTotal={supportTotal}
        selectedFilter={selectedFilter}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
};

export default Analytics;
