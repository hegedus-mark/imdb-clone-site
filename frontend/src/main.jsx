import React from "react";
import ReactDOM from "react-dom/client";
import { AuthPage, GuestView, MainPage, NotFound, UserView } from "./Pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const isItLoggedIn = false;

const routing = createBrowserRouter([
  {
    path: "/",
    element: <GuestView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    path: "/",
    element: <UserView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/segg",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routing} />
  </React.StrictMode>
);
