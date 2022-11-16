import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, selectSearch } from "../store/movies";
import _ from "lodash";

export default function MoviesFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getMovies({ search: search, genre: searchTerm, page: 1 }));
  }, [searchTerm]);

  return (
    <div>
      <h3>Filter</h3>
      <form>
        <select onChange={({ target }) => setSearchTerm(target.value)}>
          {typeMovies.map((movie) => (
            <option key={movie} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
