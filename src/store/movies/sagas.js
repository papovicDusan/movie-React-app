import { takeLatest, call, put } from "redux-saga/effects";
import { getMovies, setMovies } from "./slice";
import moviesService from "../../services/MoviesService";

function* handleGetMovies(action) {
  try {
    const movies = yield call(moviesService.getMovies);
    yield put(setMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, handleGetMovies);
}
