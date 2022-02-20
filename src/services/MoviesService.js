import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async () => {
    const { data } = await this.client.get("movies/");
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
}

const moviesService = new MoviesService();
export default moviesService;
