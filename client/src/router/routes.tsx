import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import EmployeeDetails from "../pages/employee-details/EmployeeDetails";
import Layout from "../components/layout/Layout/Layout";
import EmployeeList from "../pages/employee-list/EmployeeList";
import EmployeeCreate from "../pages/employee-create/EmployeeCreate";
import NotFound from "../pages/not-found/NotFound";
import CommonError from "../pages/error/CommonError";
import ProtectedRoute from "../components/protected/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <CommonError />,
  },
  {
    path: "/employee",
    element: <Layout />,
    errorElement: <CommonError />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id/details",
        element: (
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <EmployeeCreate />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
