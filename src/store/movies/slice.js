import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  createMovie() {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    page: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    },
    selectedMovie: null,
  },
  reducers: {
    setMovies(state, action) {
      state.page = action.payload;
    },
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    ...middlewareActions,
  },
});

export default moviesSlice.reducer;

export const { getMovies, setMovies, getMovie, setMovie, createMovie } =
  moviesSlice.actions;
