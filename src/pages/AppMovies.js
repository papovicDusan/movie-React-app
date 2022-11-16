import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectMovies,
  selectFilter,
  selectSearch,
} from "../store/movies";
import { Link } from "react-router-dom";
import MoviesSearch from "../components/MoviesSearch";
import MoviesFilter from "../components/MoviesFilter";

export default function AppMovies() {
  const movies = useSelector(selectMovies);
  const filter = useSelector(selectFilter);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies({ genre: "", search: "", page: 1 }));
  }, []);

  const add = (pageNew) => {
    dispatch(getMovies({ search: search, genre: filter, page: pageNew }));
  };

  return (
    <div>
      <h1>App movies</h1>
      <MoviesSearch />
      <MoviesFilter />
      <ul>
        {movies.results.map((movie) => (
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
                  <Link className="btn btn-light" to={`/movies/${movie._id}`}>
                    Movie detail
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {movies.previous !== null && (
        <button className="btn-primary" onClick={() => add(movies.previous)}>
          Previous
        </button>
      )}
      {movies.next !== null && (
        <button className="btn-primary" onClick={() => add(movies.next)}>
          Next
        </button>
      )}
    </div>
  );
}
