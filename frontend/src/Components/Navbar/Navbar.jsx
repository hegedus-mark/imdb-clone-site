import { Link } from "react-router-dom";

import "./style.scss";
import { useAuth } from "../../Hooks";

export function NavBar() {
  const { isItLoggedIn, user } = useAuth();

  return (
    <div>
      <ul className="navbar-container">
        <button>
          <Link to="/newsfeed">News Feed</Link>
        </button>
        <button>
          <Link to="/movies">Movies</Link>
        </button>
        <button>
          <Link to="/friends">Friends</Link>
        </button>
        <button>
          <Link to="/my-list">My list</Link>
        </li>
        {!isItLoggedIn ? (
          <li>
            <Link to="/auth">Sign in</Link>
          </li>
        ) : (
          <li>
            <Link to={`/profile/${user.userId}`}>Profile</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
