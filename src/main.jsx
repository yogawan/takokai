import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Llama3 from "./components/pages/Llama3";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Llama3 />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
