import MainLayout from "../layout/main-layout";
import DashboardDefault from "../views/dashboard";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
  ],
};

export default MainRoutes;
