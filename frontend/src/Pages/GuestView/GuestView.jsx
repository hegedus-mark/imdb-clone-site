import { Outlet } from "react-router-dom";

export const GuestView = ({ isItLoggedIn }) => {
  return (
    <div>
      <h1>GuestView</h1>
      <Outlet />
    </div>
  );
};
