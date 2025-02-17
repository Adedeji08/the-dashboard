import { useRoutes } from "react-router-dom";

import Landing from "./landing";
import Login from "../pages/auth/login";
import MainRoutes from "./main-routes";
import ForgotPassword from "../pages/auth/forgot-password/forgot-password";
import ResetPassword from "../pages/auth/reset-password/reset-password";

// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    // Landing,
    MainRoutes,
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
  ]);
}
