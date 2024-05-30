import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { NavBar, Searchbar } from "../../Components";

export const GuestView = ({ isItLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("")}>
        Guest view
      </h1>
      <NavBar />
      {location.pathname !== "/auth" && <Searchbar />}
      <Outlet />
    </div>
  );
};
