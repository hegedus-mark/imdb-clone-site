import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavBar, Searchbar } from "../../Components";

export const Root = () => {
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.pathname);
  const showSearchBar =
    location.pathname.startsWith("/movies") || location.pathname === "/";

  console.log(showSearchBar);
  return (
    <div className="main-container">
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("")}>
        Guest view
      </h1>
      <NavBar />
      {showSearchBar && <Searchbar />}
      <Outlet />
    </div>
  );
};
