import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async () => {
    const { data } = await this.client.get("movies/");
    return data;
  };
}

const moviesService = new MoviesService();
export default moviesService;
