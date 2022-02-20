import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovie, selectMovie } from "../store/movies";

export default function Movie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);

  useEffect(() => {
    dispatch(getMovie(id));
  }, [id]);

  if (!movie) {
    return null;
  }
  return (
    <div className="container">
      <div className="d-flex bd-highlight">
        <div className="col-5">
          <img width="100%" src={movie.image_url} alt="pic-any" />
          <h1>{movie.title}</h1>
          <h3>{movie.genre}</h3>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
