import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import EmployeeCreate from "./pages/employee-create/EmployeeCreate";

function App() {
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
