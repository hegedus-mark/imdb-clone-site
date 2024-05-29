import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";

export const GuestView = ({ isItLoggedIn }) => {
  return (
    <div>
      <h1>GuestView</h1>
      <NavBar />
    </div>
  );
};
