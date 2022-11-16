import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, selectFilter } from "../store/movies";
import _ from "lodash";

export default function MoviesSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    if (!searchTerm || searchTerm.length > 0) {
      dispatch(getMovies({ search: searchTerm, genre: filter, page: 1 }));
    }
  };

  const debouncedChange = useCallback(
    _.debounce(handleChangeSearchTerm, 750),
    []
  );

  useEffect(() => {
    search();
  }, [searchTerm]);

  return (
    <div>
      <h3>Search</h3>
      <div>
        <input
          type="text"
          onChange={debouncedChange}
          placeholder="Search movies"
        />
      </div>
    </div>
  );
}
