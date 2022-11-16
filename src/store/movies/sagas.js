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
  getComments,
  setComments,
  addComments,
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
    yield call(moviesService.createMovie, action.payload.movie);

    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleCreateComment(action) {
  try {
    yield call(
      moviesService.createComment,
      action.payload.movie_id,
      action.payload.content
    );
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleGetComments(action) {
  try {
    const comments = yield call(
      moviesService.getComments,
      action.payload.movie_id,
      action.payload.page
    );
    if (action.payload?.page > 1) {
      yield put(addComments(comments));
    } else {
      yield put(setComments(comments));
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

export function* watchCreateComment() {
  yield takeLatest(createComment.type, handleCreateComment);
}

export function* watchGetComments() {
  yield takeLatest(getComments.type, handleGetComments);
}
