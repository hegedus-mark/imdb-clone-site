import React from "react";
import ReactDOM from "react-dom/client";
import {
  AuthPage,
  GuestView,
  MainPage,
  NotFound,
  UserView,
  Friends,
  NewsFeed,
  Movies,
  MyList,
} from "./Pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.styles.scss";

const isItLoggedIn = false;

const routing = createBrowserRouter([
  {
    path: "/",
    element: <GuestView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/movies",
        element: <Movies />,
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
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/my-list",
        element: <MyList />,
      },
      {
        path: "/newsfeed",
        element: <NewsFeed />,
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
