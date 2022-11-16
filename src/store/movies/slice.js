import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  createMovie() {},
  createComment() {},
  getComments() {},
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
    filter: null,
    search: null,
    comments: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    },
  },
  reducers: {
    setMovies(state, action) {
      state.page = action.payload;
    },
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    addComments(state, action) {
      action.payload.results = [
        ...state.comments.results,
        ...action.payload.results,
      ];
      state.comments = action.payload;
    },
    ...middlewareActions,
  },
});

export default moviesSlice.reducer;

export const {
  getMovies,
  setMovies,
  getMovie,
  setMovie,
  createMovie,
  setFilter,
  setSearch,
  createComment,
  getComments,
  setComments,
  addComments,
} = moviesSlice.actions;
