import MainLayout from "../layout/main-layout";
import AuthGuard from "../utilities/constant/private-route";
import BlackList from "../views/blacklist";
import Blacklist from "../views/blacklist/blacklist-details";
import ReportDetails from "../views/blacklist/report-details";
import DashboardDefault from "../views/dashboard";
import AccountDetails from "../views/dashboard/account-details";
import Mediation from "../views/mediation";
import MediatorDetails from "../views/mediation/mediator-details";
import Notification from "../views/notification/notification";
import Refund from "../views/refunds";
import Settings from "../views/settings";
import CustomerSupport from "../views/customer-support";
import Transaction from "../views/transaction";
import TransactionDetails from "../views/transaction/transaction-details";
import PaymentRequest from "../views/transaction/transaction-details/payment-req";
import RequestDetails from "../views/customer-support/request-details";
import Analytics from "../views/analytics";
import Admins from "../views/admins";
import AdminDetails from "../views/admins/adminDetails";
import RefundDetails from "../views/refunds/refund-details";


const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/account/details/:id",
      element: <AccountDetails />,
    },
    {
      path: "/transactions",
      element: <Transaction />,
    },
    {
      path: "/refunds",
      element: <Refund />,
    },
    {
      path: "/transaction/details/:id",
      element: <TransactionDetails />,
    },
    {
      path: "/blacklist",
      element: <BlackList />,
    },
    {
      path: "/report/:id",
      element: <ReportDetails />,
    },
    {
      path: "/blacklists/report/:id",
      element: <Blacklist />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/mediation",
      element: <Mediation />,
    },

    {
      path: "/payment/request/:id",
      element: <PaymentRequest />,
    },

    {
      path: "/mediation/details/:_id",
      element: <MediatorDetails />,
    },
    {
      path: "/notification",
      element: <Notification />,
    },
    {
      path: "/support",
      element: <CustomerSupport />,
    },
    {
      path:"/admins",
      element: <Admins/>,
    },
    {
      path: "/admins/detail/:id",
      element: <AdminDetails />,
    },
    {
      path: "/request/:id",
      element: <RequestDetails />,
    },
    {
      path: "/analytics",
      element: <Analytics />,
    },
    {
      path: "/refund/:id",
      element: <RefundDetails />,
    },
  ],
};

export default MainRoutes;
