import HttpService from "./HttpService";

class AuthService extends HttpService {
  register = async (userData) => {
    const { data } = await this.client.post("users/", userData);
    // localStorage.setItem("token", data.token);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post("login/", credentials);
    localStorage.setItem("token", data.access);
    return data;
  };

  logout = async () => {
    await this.client.post("auth/logout");
    // localStorage.removeItem("token");
  };

  getActiveUser = async () => {
    const { data } = await this.client.get("users/me");
    return data;
  };

  addMovieWatchlist = async (movie) => {
    const { data } = await this.client.post(`watchlists/`, movie);
    return data;
  };

  updateWatchlist = async (watchlist_id, is_watched) => {
    const { data } = await this.client.put(
      `watchlists/${watchlist_id}/`,
      is_watched
    );
    return data;
  };

  deleteMovieWatchlist = async (watchlist_id) => {
    const { data } = await this.client.delete(`watchlists/${watchlist_id}/`);
    return data;
  };
}

export default new AuthService();
