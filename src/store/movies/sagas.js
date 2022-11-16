import { takeLatest, call, put } from "redux-saga/effects";
import moviesService from "../../services/MoviesService";
import {
  getMovies,
  setMovies,
  getMovie,
  setMovie,
  createMovie,
  setFilter,
  setSearch,
  createComment,
  addComment,
} from "./slice";

function* handleGetMovies(action) {
  try {
    const movies = yield call(
      moviesService.getMovies,
      action.payload.genre,
      action.payload.search,
      action.payload.page
    );
    yield put(setMovies(movies));
    yield put(setFilter(action.payload.genre));
    yield put(setSearch(action.payload.search));
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

function* handleCreateComment(action) {
  try {
    const comment = yield call(
      moviesService.createComment,
      action.payload.movie_id,
      action.payload.content
    );
    yield put(addComment(comment));
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

export function* watchCreateComment() {
  yield takeLatest(createComment.type, handleCreateComment);
}
