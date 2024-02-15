import MainLayout from "../layout/main-layout";
import AuthGuard from "../utilities/constant/private-route";
import DashboardDefault from "../views/dashboard";

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
  ],
};

export default MainRoutes;
