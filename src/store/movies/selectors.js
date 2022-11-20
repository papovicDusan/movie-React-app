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

export function selectComments(state) {
  return state.movies.comments;
}

export function selectPopularMovies(state) {
  return state.movies.popularMovies;
}

export function selectGenreMovies(state) {
  return state.movies.genreMovies;
}
