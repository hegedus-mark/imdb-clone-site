import { Link } from "react-router-dom";

import "./style.scss";
import { useAuth } from "../../Hooks";

export function NavBar() {
  const { isItLoggedIn, user } = useAuth();

  return (
    <div className="navbar-container">
      <Link to="/newsfeed">
        <button className="navButton scalingButton"> &#10013; News Feed</button>
      </Link>
      <Link to="/movies">
        <button className="navButton scalingButton">Movies</button>
      </Link>
      <Link to="/friends">
        <button className="navButton scalingButton"> &#10013; Friends</button>
      </Link>
      <Link to="/my-list">
        <button className="navButton scalingButton">My list</button>
      </Link>
      {!isItLoggedIn ? (
        <Link to="/auth">
          <button className="navButton scalingButton">Sign in</button>
        </Link>
      ) : (
        <Link to={`/profile/${user.userId}`}>
          <button className="navButton scalingButton">Profile</button>
        </Link>
      )}
    </div>
  );
}
