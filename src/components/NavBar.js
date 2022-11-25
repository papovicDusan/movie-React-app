import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "../store/auth";

export default function NavBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="navbar navbar-dark bg-light">
      {isAuthenticated ? (
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies/create">
              Add Movie
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/watchlist">
              Watchlist
            </Link>
          </li>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      ) : (
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
