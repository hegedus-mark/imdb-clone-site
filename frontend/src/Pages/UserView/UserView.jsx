import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const UserView = ({ isItLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isItLoggedIn) {
      navigate("/auth");
    }
  }, [isItLoggedIn]);

  return (
    isItLoggedIn && (
      <div>
        <h1>UserView</h1>
        <Outlet />
      </div>
    )
  );
};
