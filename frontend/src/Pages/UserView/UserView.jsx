import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from "../../Components";

export const UserView = ({ isItLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isItLoggedIn) {
      navigate("/auth");
    }
  }, [isItLoggedIn, navigate]);

  return (
    isItLoggedIn && (
      <div>
        <NavBar />
        <Outlet />
      </div>
    )
  );
};
