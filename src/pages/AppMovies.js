import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectMovies,
  selectFilter,
  selectSearch,
  getPopularMovies,
  selectPopularMovies,
} from "../store/movies";
import { selectActiveUser } from "../store/auth";
import { Link } from "react-router-dom";
import MoviesSearch from "../components/MoviesSearch";
import MoviesFilter from "../components/MoviesFilter";

export default function AppMovies() {
  const movies = useSelector(selectMovies);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);
  const popularMovies = useSelector(selectPopularMovies);

  const dispatch = useDispatch();

  const activeUser = useSelector(selectActiveUser);

  const isWatched = [];
  if (movies && activeUser) {
    movies?.docs.map((movie) => {
      const watchlistElement = activeUser.watchlistsArray.find(
        (watchlist) => watchlist.movie === movie._id
      );
      const isWatchedMovie = !!watchlistElement?.is_watched;
      isWatched[movie._id] = isWatchedMovie;
    });
  }

  useEffect(() => {
    dispatch(getMovies({ genre: "", search: "", page: 1 }));
    dispatch(getPopularMovies());
  }, []);

  const add = (pageNew) => {
    dispatch(getMovies({ search: search, genre: filter, page: pageNew }));
  };

  return (
    <div className="container">
      <div className="d-flex">
        <div className="col-9">
          <h1>App movies</h1>
          <MoviesSearch />
          <MoviesFilter />
          <ul>
            {movies.docs.map((movie) => (
              <li key={movie._id}>
                <div
                  className="card card-image"
                  style={{
                    backgroundImage: `url(${movie.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                    <div>
                      <h3 className="card-title pt-2">
                        <strong>{movie.title}</strong>
                      </h3>
                      <p>{movie.description.substring(0, 100)}</p>
                      <Link
                        className="btn btn-light"
                        to={`/movies/${movie._id}`}
                      >
                        Movie detail
                      </Link>
                      <p>
                        Number of like
                        {movie.numberOfLikes ? movie.numberOfLikes : 0}
                      </p>
                      <p>
                        Number of dislike
                        {movie.numberOfDislikes ? movie.numberOfDislikes : 0}
                      </p>
                      <p>Number of visit {movie.visits}</p>
                      {isWatched[movie._id] && <p>You've watched this!</p>}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {movies.prevPage !== null && (
            <button
              className="btn-primary"
              onClick={() => add(movies.prevPage)}
            >
              Previous
            </button>
          )}
          {movies.nextPage !== null && (
            <button
              className="btn-primary"
              onClick={() => add(movies.nextPage)}
            >
              Next
            </button>
          )}
        </div>
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <h3>Popular movies</h3>
            <ul className="list-unstyled components mb-5">
              {popularMovies?.map((movie) => (
                <li key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>
                    {movie.movie[0].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
