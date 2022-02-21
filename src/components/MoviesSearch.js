import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "../store/movies";
import _ from "lodash";

export default function MoviesSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    if (!searchTerm || searchTerm.length > 0) {
      dispatch(getMovies({ search: searchTerm, page: 1 }));
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
      <input
        type="text"
        onChange={debouncedChange}
        placeholder="Search movies"
      />
    </div>
  );
}
