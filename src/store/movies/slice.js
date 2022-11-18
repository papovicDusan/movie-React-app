import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  createMovie() {},
  createComment() {},
  getComments() {},
  createLike() {},
  deleteLike() {},
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
    setLikes(state, action) {
      state.selectedMovie.numberOfLikes = state.selectedMovie.numberOfLikes + 1;
      if (state.selectedMovie.likedOrDislikedUser === -1) {
        state.selectedMovie.numberOfDislikes =
          state.selectedMovie.numberOfDislikes - 1;
      }
      state.selectedMovie.likedOrDislikedUser = 1;
    },
    setDislikes(state, action) {
      state.selectedMovie.numberOfDislikes =
        state.selectedMovie.numberOfDislikes + 1;
      if (state.selectedMovie.likedOrDislikedUser === 1) {
        state.selectedMovie.numberOfLikes =
          state.selectedMovie.numberOfLikes - 1;
      }
      state.selectedMovie.likedOrDislikedUser = -1;
    },
    removeLikes(state, action) {
      state.selectedMovie.numberOfLikes = state.selectedMovie.numberOfLikes - 1;
      state.selectedMovie.likedOrDislikedUser = 0;
    },
    removeDislikes(state, action) {
      state.selectedMovie.numberOfDislikes =
        state.selectedMovie.numberOfDislikes - 1;
      state.selectedMovie.likedOrDislikedUser = 0;
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
  createLike,
  setLikes,
  setDislikes,
  deleteLike,
  removeLikes,
  removeDislikes,
} = moviesSlice.actions;
