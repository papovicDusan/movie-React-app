import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, selectMovies } from "../store/movies";
import { Link } from "react-router-dom";

export default function AppMovies() {
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div>
      <h1>App movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
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
                  <Link className="btn btn-light" to={`/movies/${movie.id}`}>
                    Movie detail
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
