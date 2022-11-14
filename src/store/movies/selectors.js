export function selectMovies(state) {
  return state.movies.allMovies;
}

export function selectMovie(state) {
  return state.movies.selectedMovie;
}
