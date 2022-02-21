import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async (page = 1) => {
    let endpoint = "/movies";
    endpoint += `?page=${page}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

  getMovie = async (id) => {
    const { data } = await this.client.get(`movies/${id}`);
    console.log(data);
    return data;
  };

  createMovie = async (movieData) => {
    const { data } = await this.client.post(`movies/`, movieData);
    return data;
  };
}

const moviesService = new MoviesService();
export default moviesService;
