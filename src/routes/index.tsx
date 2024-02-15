import { useRoutes } from "react-router-dom";

import Landing from "./landing";
import Login from "../pages/login";
import MainRoutes from "./main-routes";

// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    Landing,
    MainRoutes,
    { path: "/login", element: <Login /> },
  ]);
}
