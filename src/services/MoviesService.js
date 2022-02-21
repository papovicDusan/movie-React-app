import HttpService from "./HttpService";

class MoviesService extends HttpService {
  getMovies = async (search = "", page = 1) => {
    let endpoint = "movies/";
    let query = [];
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
