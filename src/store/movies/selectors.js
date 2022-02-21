export function selectMovies(state) {
  return state.movies.page;
}

export function selectMovie(state) {
  return state.movies.selectedMovie;
}
