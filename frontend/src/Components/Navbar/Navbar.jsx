import { Link } from "react-router-dom";
import "./style.scss";
export function NavBar() {
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
        </button>
        <button>
          <Link to="/auth">Sign in</Link>
        </button>
      </ul>
    </div>
  );
}
