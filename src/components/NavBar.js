import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";

export default function NavBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </nav>
  );
}
