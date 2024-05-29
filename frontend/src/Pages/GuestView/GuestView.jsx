import { Outlet } from "react-router-dom";
import { NavBar } from "../../Components";

export const GuestView = ({ isItLoggedIn }) => {
  return (
    <div>
      <h1>Hello</h1>
      <NavBar />
      <Outlet />
    </div>
  );
};
