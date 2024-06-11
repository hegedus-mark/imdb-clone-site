import { Link } from "react-router-dom";

import "./style.scss";
import { useAuth } from "../../Hooks";

export function NavBar() {
  const { isItLoggedIn, user } = useAuth();

  return (
    <div>
      <ul className="navbar-container">
        <button className="scalingButton">
          <Link to="/newsfeed">News Feed</Link>
        </button>
        <button className="scalingButton">
          <Link to="/movies">Movies</Link>
        </button>
        <button className="scalingButton">
          <Link to="/friends">Friends</Link>
        </button>
        <button className="scalingButton">
          <Link to="/my-list">My list</Link>
        </button>
        {!isItLoggedIn ? (
          <button className="scalingButton">
            <Link to="/auth">Sign in</Link>
          </button>
        ) : (
          <button className="scalingButton">
            <Link to={`/profile/${user.userId}`}>Profile</Link>
          </button>
        )}
      </ul>
    </div>
  );
}
