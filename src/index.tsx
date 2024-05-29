import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/error-page";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import { setupStore } from "./store/store";
import Action from "./pages/Action";
import InitQuiz from "./pages/InitQuiz";
import Result from "./pages/Result";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = setupStore();

const SetTheme = () => {
  const theme = useLocalStorage("theme").getItem() ?? "light";
  document.documentElement.setAttribute("data-theme", theme);
};
SetTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "create/",
        element: <Create />,
      },
      {
        path: "edit/",
        element: <Edit />,
      },
      {
        path: "init/",
        element: <InitQuiz />,
      },
      {
        path: "action/:id/:page",
        element: <Action />,
      },
      {
        path: "result/:id",
        element: <Result />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
