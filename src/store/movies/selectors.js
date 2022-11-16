export function selectMovies(state) {
  return state.movies.page;
}

export function selectMovie(state) {
  return state.movies.selectedMovie;
}

export function selectFilter(state) {
  return state.movies.filter;
}

export function selectSearch(state) {
  return state.movies.search;
}
