import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppMovies from "./pages/AppMovies";
import Movie from "./pages/Movie";

import { getActiveUser, selectIsAuthenticated } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getActiveUser());
  //   }
  // }, []);

  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <PrivateRoute exact path="/movies">
            <AppMovies />
          </PrivateRoute>
          <PrivateRoute exact path="/movies/:id">
            <Movie />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
