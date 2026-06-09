import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { router } from "./router/routes";
import store from "./store/store";

function App() {
  const { data, pending, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(data, pending, "Data from api response");
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
