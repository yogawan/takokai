import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import JawirAI from "./components/pages/JawirAI";
import DeepSeek from "./components/pages/DeepSeek";
import Llama from "./components/pages/Llama";
import Gemma from "./components/pages/Gemma";
import SpecDec from "./components/pages/SpecDec";
import Versatile from "./components/pages/Versatile";
import Vision from "./components/pages/Vision";
import Whisper from "./components/pages/Whisper";

const router = createBrowserRouter([
  {
    path: "/gemma2-9b-it",
    element: <Gemma />,
  },
  {
    path: "/deepseek-r1-distill-llama-70b",
    element: <DeepSeek />,
  },
  {
    path: "/llama3-70b-8192",
    element: <Llama />,
  },
  {
    path: "/",
    element: <JawirAI />,
  },
  {
    path: "/specdec-llama-3.3-70b",
    element: <SpecDec />,
  },
  {
    path: "/versatile-llama-3.3-70b",
    element: <Versatile />,
  },
  {
    path: "/vision-llama-3.2-90b",
    element: <Vision />,
  },
  {
    path: "/whisper-large-v3-turbo",
    element: <Whisper />,
  },
]);

export default router;


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
