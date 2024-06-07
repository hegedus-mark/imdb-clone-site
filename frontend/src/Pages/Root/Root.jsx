import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, Searchbar } from "../../Components";


export const Root = () => {

  const navigate = useNavigate();
  console.log("in Guest view")
  return (
    <div className="main-container">
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("")}>
        Guest view
      </h1>
      <NavBar />
      <Searchbar />
      <Outlet />
    </div>
  );
};
