import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  register() {},
  login() {},
  logout() {},
  getActiveUser() {},
  addMovieWatchlist() {},
  updateWatchlist() {},
  deleteMovieWatchlist() {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    activeUser: null,
  },
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setMovieInWatchlist(state, action) {
      state.activeUser.watchlistsArray.push(action.payload);
    },
    setMovieIsWatched(state, action) {
      state.activeUser.watchlistsArray = state.activeUser.watchlistsArray.map(
        (watchlist) => {
          if (watchlist._id === action.payload) {
            watchlist.is_watched = true;
          }
          return watchlist;
        }
      );
    },
    removeMovieWatchlist(state, action) {
      state.activeUser.moviesArray = state.activeUser.moviesArray.filter(
        (movie) => movie._id !== action.payload.movieId
      );
      state.activeUser.watchlistsArray =
        state.activeUser.watchlistsArray.filter(
          (watchlist) => watchlist._id !== action.payload.watchlistId
        );
    },
    ...middlewareActions,
  },
});

export const {
  register,
  login,
  logout,
  getActiveUser,
  setActiveUser,
  setToken,
  addMovieWatchlist,
  updateWatchlist,
  setMovieInWatchlist,
  setMovieIsWatched,
  deleteMovieWatchlist,
  removeMovieWatchlist,
} = authSlice.actions;
export default authSlice.reducer;
