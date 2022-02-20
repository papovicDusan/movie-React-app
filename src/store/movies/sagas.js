import { takeLatest, call, put } from "redux-saga/effects";
import moviesService from "../../services/MoviesService";
import { getMovies, setMovies, getMovie, setMovie } from "./slice";

function* handleGetMovies(action) {
  try {
    const movies = yield call(moviesService.getMovies);
    yield put(setMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

function* handleGetMovie(action) {
  try {
    const movie = yield call(moviesService.getMovie, action.payload);
    yield put(setMovie(movie));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, handleGetMovies);
}

export function* watchGetMovie() {
  yield takeLatest(getMovie.type, handleGetMovie);
}
