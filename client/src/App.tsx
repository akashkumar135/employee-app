import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import ChatExample from "./pages/ChatExample";
import EmployeeCreate from "./pages/employee-create/EmployeeCreate";
import EmployeeDetails from "./pages/employee-details/EmployeeDetails";
import EmployeeList from "./pages/employee-list/EmployeeList";

import { useFetch } from "./hooks/useFetch";
import Login from "./pages/login/Login";

function App() {
  const { data, pending, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(data, pending, "Data from api response");
  return (
    <>
      {/* <Layout> */}
      {/* <EmployeeCreate /> */}
      {/* <ChatExample /> */}
      {/* <EmployeeList /> */}
      {/* <EmployeeDetails /> */}
      <Login />
      {/* </Layout> */}
    </>
  );
}

export default App;
