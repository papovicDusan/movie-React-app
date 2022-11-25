import { takeLatest, call, put } from "redux-saga/effects";
import {
  getActiveUser,
  login,
  logout,
  register,
  setActiveUser,
  setToken,
  addMovieWatchlist,
  updateWatchlist,
  setMovieInWatchlist,
  setMovieIsWatched,
  deleteMovieWatchlist,
  removeMovieWatchlist,
} from "./slice";
import authService from "../../services/AuthService";

function* registerHandler(action) {
  try {
    yield call(authService.register, action.payload.userData);
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* loginHandler(action) {
  try {
    const data = yield call(authService.login, action.payload.userData);
    yield put(setToken(data.access));
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutHandler() {
  try {
    // yield call(authService.logout);
    localStorage.removeItem("token");

    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {
    console.log(error);
  }
}

function* getActiveUserHandler() {
  try {
    const activeUser = yield call(authService.getActiveUser);
    yield put(setActiveUser(activeUser));
  } catch (error) {
    console.log(error);
  }
}

function* handleAddMovieWatchlist(action) {
  try {
    const watchlist = yield call(
      authService.addMovieWatchlist,
      action.payload.movie_id
    );
    yield put(setMovieInWatchlist(watchlist));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateWatchlist(action) {
  try {
    yield call(
      authService.updateWatchlist,
      action.payload.watchlist_id,
      action.payload.is_watched
    );
    yield put(setMovieIsWatched(action.payload.watchlist_id));
  } catch (error) {
    console.error(error);
  }
}

function* handleDeleteMovieWatchlist(action) {
  try {
    yield call(authService.deleteMovieWatchlist, action.payload.watchlistId);
    yield put(removeMovieWatchlist(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}
export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}
export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}
export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}

export function* watchAddMovieWatchlist() {
  yield takeLatest(addMovieWatchlist.type, handleAddMovieWatchlist);
}

export function* watchUpdateWatchlist() {
  yield takeLatest(updateWatchlist.type, handleUpdateWatchlist);
}

export function* watchDeleteMovieWatchlist() {
  yield takeLatest(deleteMovieWatchlist.type, handleDeleteMovieWatchlist);
}
