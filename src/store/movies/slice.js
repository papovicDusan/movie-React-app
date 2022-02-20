import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: [],
  },
  reducers: {
    setMovies(state, action) {
      state.allMovies = action.payload;
    },
    ...middlewareActions,
  },
});

export default moviesSlice.reducer;

export const { getMovies, setMovies } = moviesSlice.actions;
