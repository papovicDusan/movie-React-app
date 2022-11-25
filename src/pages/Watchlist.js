import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveUser } from "../store/auth";
import {
  updateWatchlist,
  deleteMovieWatchlist,
  getActiveUser,
} from "../store/auth";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);

  const isWatched = [];
  const watchlistId = [];

  if (activeUser) {
    activeUser?.moviesArray.map((movie) => {
      const watchlistElement = activeUser.watchlistsArray.find(
        (watchlist) => watchlist.movie === movie._id
      );
      const isWatchedMovie = !!watchlistElement?.is_watched;
      isWatched[movie._id] = isWatchedMovie;
      watchlistId[movie._id] = watchlistElement?._id;
    });
  }

  useEffect(() => {
    dispatch(getActiveUser());
  }, []);

  const checkViewed = (id) => {
    dispatch(
      updateWatchlist({
        watchlist_id: id,
        is_watched: { is_watched: true },
      })
    );
  };

  const removeMovieWatchlist = (watchlistId, movieId) => {
    dispatch(
      deleteMovieWatchlist({
        watchlistId: watchlistId,
        movieId: movieId,
      })
    );
  };

  return (
    <div className="container">
      <ul>
        {activeUser?.moviesArray?.map((movie) => (
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

                  {isWatched[movie._id] === true ? (
                    <h3 className="text-danger">You've watched this!</h3>
                  ) : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={movie.is_watched}
                        id="defaultCheck1"
                        onChange={() => checkViewed(watchlistId[movie._id])}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Check if you watched the movie
                      </label>
                    </div>
                  )}
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      removeMovieWatchlist(watchlistId[movie._id], movie._id)
                    }
                  >
                    Delete from Watchlist
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
