import MainLayout from "../layout/main-layout";
import AuthGuard from "../utilities/constant/private-route";
import BlackList from "../views/blacklist";
import ReportDetails from "../views/blacklist/report-details";
import DashboardDefault from "../views/dashboard";
import AccountDetails from "../views/dashboard/account-details";
import Refund from "../views/refunds";
import Transaction from "../views/transaction";
import TransactionDetails from "../views/transaction/transaction-details";


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
      path: "/report/details/:id",
      element: <ReportDetails />,
    },
  ],
};

export default MainRoutes;
