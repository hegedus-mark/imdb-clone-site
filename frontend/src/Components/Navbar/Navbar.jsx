import { Link } from "react-router-dom";
import "./style.scss";
export function NavBar() {
  return (
    <div>
      <ul className="container">
        <li>
          <Link to="/newsfeed">News Feed</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/my-list">My list</Link>
        </li>
        <li>
          <Link to="/auth">Sign in</Link>
        </li>
      </ul>
    </div>
  );
}
