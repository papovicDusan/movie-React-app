import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createMovie } from "../store/movies";
import { useEffect } from "react";

export default function CreateMovie() {
  const history = useHistory();

  const typeMovies = [
    "historical",
    "horror",
    "comedy",
    "crime",
    "western",
    "fantasy",
    "action",
    "drama",
    "romance",
    "thriller",
    "adventure",
    "mystery",
    "political",
  ];

  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    image_url: "",
    genre: typeMovies[0],
  });

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      createMovie({
        movie: movieData,
        onSuccess: () => {
          history.push(`/movies`);
        },
      })
    );
  }

  return (
    <div>
      <h1>Create Movie</h1>
      <form>
        <div>
          <input
            required
            placeholder="Title"
            value={movieData.title}
            onChange={({ target }) =>
              setMovieData({ ...movieData, title: target.value })
            }
          />
        </div>

        <div>
          <input
            required
            placeholder="Description"
            value={movieData.description}
            onChange={({ target }) =>
              setMovieData({ ...movieData, description: target.value })
            }
          />
        </div>

        <div>
          <input
            required
            placeholder="Image"
            value={movieData.image_url}
            onChange={({ target }) =>
              setMovieData({ ...movieData, image_url: target.value })
            }
          />
        </div>

        <select
          onChange={({ target }) =>
            setMovieData({ ...movieData, genre: target.value })
          }
        >
          {typeMovies.map((movie) => (
            <option key={movie} value={movie}>
              {movie}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
