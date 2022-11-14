import { takeLatest, call, put } from "redux-saga/effects";
import moviesService from "../../services/MoviesService";
import { getMovies, setMovies, getMovie, setMovie, createMovie } from "./slice";

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

function* handleCreateMovie(action) {
  try {
    const movie = yield call(moviesService.createMovie, action.payload.movie);

    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, handleGetMovies);
}

export function* watchGetMovie() {
  yield takeLatest(getMovie.type, handleGetMovie);
}

export function* watchCreateMovie() {
  yield takeLatest(createMovie.type, handleCreateMovie);
}
