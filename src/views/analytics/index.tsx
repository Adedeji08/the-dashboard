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
import TransactionChart from "./transaction";

interface ChartData {
  name: string;
}

const Analytics = () => {
  const userToken = localStorage.getItem("token");
  const [modalVisible, setModalVisible] = useState(false);
  const [accountChart, setAccountChart] = useState<ChartData[]>([]);
  const [accountTotal, setAccountTotal] = useState<ChartData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("year");

  const [orderChart, setOrderChart] = useState<ChartData[]>([]);
  const [orderTotal, setOrderTotal] = useState<ChartData[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("year");

  const [paymentChart, setPaymentChart] = useState<ChartData[]>([]);
  const [paymentTotal, setPaymentTotal] = useState<ChartData[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string>("year");

  const [mediationChart, setMediationChart] = useState<ChartData[]>([]);
  const [mediationTotal, setMediationTotal] = useState<ChartData[]>([]);
  const [mediationFilter, setMediationFilter] = useState<string>("year");

  const [reportChart, setReportChart] = useState<ChartData[]>([]);
  const [reportTotal, setReportTotal] = useState<ChartData[]>([]);
  const [reportFilter, setReportFilter] = useState<string>("year");

  const [supportChart, setSupportChart] = useState<ChartData[]>([]);
  const [supportTotal, setSupportTotal] = useState<ChartData[]>([]);
  const [supportFilter, setSupportFilter] = useState<string>("year");

  const [transactionChart, setTransactionChart] = useState<ChartData[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<ChartData[]>([]);
  const [transactionFilter, setTransactionFilter] = useState<string>("year");

  const openNotification = () => {
    setModalVisible(true);
  };
  const { makeRequest } = useRequest("/users/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: graphOrder } = useRequest("/orders/graph", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: graphTransaction } = useRequest(
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


  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };
  const handleTransactionStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransactionFilter(event.target.value);
  };

  const handleOrderStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderFilter(event.target.value);
  };

  const handlePaymentStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentFilter(event.target.value);
  };

  const handleMediationStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMediationFilter(event.target.value);
  };

  const handleReportStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReportFilter(event.target.value);
  };

  const handleSupportStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSupportFilter(event.target.value);
  };
  
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

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderFilter]);

  const fetchOrderData = async () => {
    const [response] = await graphOrder(undefined, {
      filter: orderFilter,
    });
    setOrderTotal(response.data || []);
    setOrderChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentFilter]);

  const fetchPaymentsData = async () => {
    const [response] = await graphPayment(undefined, {
      filter: paymentFilter,
    });
    setPaymentTotal(response.data || []);
    setPaymentChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchMediationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediationFilter]);

  const fetchMediationData = async () => {
    const [response] = await graphMediation(undefined, {
      filter: mediationFilter,
    });
    setMediationTotal(response.data || []);
    setMediationChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportFilter]);

  const fetchReportData = async () => {
    const [response] = await graphReport(undefined, {
      filter: reportFilter,
    });
    setReportTotal(response.data || []);
    setReportChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchSupportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportFilter]);

  const fetchSupportData = async () => {
    const [response] = await graphSupport(undefined, {
      filter: supportFilter,
    });
    setSupportTotal(response.data || []);
    setSupportChart(response.data?.graph || []);
  };

  useEffect(() => {
    fetchTransactionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionFilter]);

  const fetchTransactionData = async () => {
    const [response] = await graphTransaction(undefined, {
      filter: transactionFilter,
    });
    setTransactionTotal(response.data || []);
    setTransactionChart(response.data?.graph || []);
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
        orderFilter={orderFilter}
        handleOrderStatusChange={handleOrderStatusChange}
      />

      <PaymentChart
        chartdata={paymentChart}
        paymentTotal={paymentTotal}
        paymentFilter={paymentFilter}
        handlePaymentStatusChange={handlePaymentStatusChange}
      />

      <TransactionChart
        chartdata={transactionChart}
        transactionTotal={transactionTotal}
        transactionFilter={transactionFilter}
        handleTransactionStatusChange={handleTransactionStatusChange}
      />

      <MediationChart
        chartdata={mediationChart}
        mediationTotal={mediationTotal}
        mediationFilter={mediationFilter}
        handleMediationStatusChange={handleMediationStatusChange}
      />

      <ReportsChart
        chartdata={reportChart}
        reportTotal={reportTotal}
        reportFilter={reportFilter}
        handleReportStatusChange={handleReportStatusChange}
      />

      <SupportChart
        chartdata={supportChart}
        supportTotal={supportTotal}
        selectedFilter={selectedFilter}
        handleSupportStatusChange={handleSupportStatusChange}
      />
    </>
  );
};

export default Analytics;
