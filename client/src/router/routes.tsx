import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import EmployeeDetails from "../pages/employee-details/EmployeeDetails";
import Layout from "../components/layout/Layout/Layout";
import EmployeeList from "../pages/employee-list/EmployeeList";
import EmployeeCreate from "../pages/employee-create/EmployeeCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/employee",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmployeeList />,
      },
      {
        path: "details",
        element: <EmployeeDetails />,
      },
      {
        path: "create",
        element: <EmployeeCreate />,
      },
    ],
  },
]);
