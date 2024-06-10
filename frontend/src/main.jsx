import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthPage,
  Root,
  MainPage,
  NotFound,
  Friends,
  NewsFeed,
  Movies,
  MyList,
  Profile,
} from "./Pages";
import { MoviePage } from "./Pages/MoviePage/MoviePage";
import { PrivateRoute } from "./Components";
import { GuestOnlyRoute } from "./Components/GuestOnlyRoute/GuestOnlyRoute";
import { AuthProvider } from "./Components/contexts/AuthContext/AuthContext";
import { WatchlistProvider } from "./Components/contexts/WatchlistContext/WatchlistContext";
import { ToastProvider } from "./Components/contexts/ToastContext/ToastContext";
import "./main.styles.scss";

const routing = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/auth",
        element: <GuestOnlyRoute element={<AuthPage />} />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
      {
        path: "/profile/:userId",
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: "/friends",
        element: <PrivateRoute element={<Friends />} />,
      },
      {
        path: "/my-list",
        element: <PrivateRoute element={<MyList />} />,
      },
      {
        path: "/newsfeed",
        element: <PrivateRoute element={<NewsFeed />} />,
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
    <AuthProvider>
      <WatchlistProvider>
        <ToastProvider>
          <RouterProvider router={routing} />
        </ToastProvider>
      </WatchlistProvider>
    </AuthProvider>
  </React.StrictMode>
);
