import MainLayout from "../layout/main-layout";
import AuthGuard from "../utilities/constant/private-route";
import DashboardDefault from "../views/dashboard";
import AccountDetails from "../views/dashboard/account-details";
import Transaction from "../views/transaction";

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
  ],
};

export default MainRoutes;
