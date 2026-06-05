import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";

function App() {
  const { data, pending, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(data, pending, "Data from api response");
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
