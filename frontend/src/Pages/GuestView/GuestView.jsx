import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../../Components";

export const GuestView = ({ isItLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("")}>
        Guest view
      </h1>
      <NavBar />
      <Outlet />
    </div>
  );
};
