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
import TestPage from "./Pages/TestPage/TestPage";
import "./main.styles.scss"


const isItLoggedIn = false;

const routing = createBrowserRouter([
  {
    path: "/",
    element: <GuestView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/newsfeed",
        element: <NewsFeed />,
      },
      {
        path: "/movies",
        element: <Movies />,
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
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/test",
        element: <TestPage/>,
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
