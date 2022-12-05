import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async (genre = "", search = "", page = 1) => {
    let endpoint = "movies/";
    let query = [];
    if (genre) {
      query.push(`genre=${genre}`);
    }
    if (search) {
      query.push(`search=${search}`);
    }
    if (page) {
      query.push(`page=${page}`);
    }
    let query2 = query.join("&");
    endpoint += `?${query2}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getMovie = async (id) => {
    const { data } = await this.client.get(`movies/${id}`);
    return data;
  };

  createMovie = async (movieData) => {
    const { data } = await this.client.post(`movies/`, movieData);
    return data;
  };

  createComment = async (movie_id, content) => {
    const { data } = await this.client.post(`movies/${movie_id}/comments`, {
      content,
      movie_id,
    });
    return data;
  };

  getComments = async (movie_id = "", page = 1) => {
    let endpoint = `movies/${movie_id}/comments?page=${page}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  createLike = async (movie_id, like) => {
    const { data } = await this.client.post(`movies/${movie_id}/likes/`, {
      movie_id,
      like,
    });
    return data;
  };

  deleteLike = async (movie_id) => {
    const { data } = await this.client.delete(`movies/${movie_id}/likes`);
    return data;
  };

  getPopularMovies = async () => {
    const { data } = await this.client.get(`movies/movies-popular`);
    return data;
  };

  getGenreMovies = async (id) => {
    const { data } = await this.client.get(`movies/${id}/related-movies`);
    return data;
  };

  addVisit = async (id) => {
    const { data } = await this.client.put(`movies/${id}/visits`);
    return data;
  };
}

const moviesService = new MoviesService();
export default moviesService;
