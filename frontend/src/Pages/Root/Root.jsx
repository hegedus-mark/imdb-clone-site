import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavBar, Searchbar } from "../../Components";

import "./style.scss";
export const Root = () => {
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.pathname);
  const showSearchBar =
    location.pathname.startsWith("/movies") || location.pathname === "/";

  console.log(showSearchBar);
  return (
    <div className="main-container">
      <div className="top-container">
        <div className="web-title" onClick={() => navigate("")}>
          <img src="../../public/images/image-removebg-preview.png"></img>
          <h1>THE DENTIST MOVIES</h1>
        </div>
        <NavBar />
      </div>
      {showSearchBar ? <Searchbar /> : <div className="empty"></div>}
      <Outlet />
    </div>
  );
};
