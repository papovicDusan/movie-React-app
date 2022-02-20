import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: [],
    selectedMovie: null,
  },
  reducers: {
    setMovies(state, action) {
      state.allMovies = action.payload;
    },
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    ...middlewareActions,
  },
});

export default moviesSlice.reducer;

export const { getMovies, setMovies, getMovie, setMovie } = moviesSlice.actions;
