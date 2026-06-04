import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import EmployeeCreate from "./pages/employee-create/EmployeeCreate";

import { useFetch } from "./hooks/useFetch";

function App() {
  const { data, pending, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(data, pending, "Data from api response");
  return (
    <>
      <Layout>
        {/* <Login /> */}
        <EmployeeCreate />
      </Layout>
    </>
  );
}

export default App;
