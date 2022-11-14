import HttpService from "./HttpService";

class AuthService extends HttpService {
  register = async (userData) => {
    const { data } = await this.client.post("auth/register/", userData);
    // localStorage.setItem("token", data.token);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post("auth/login/", credentials);
    localStorage.setItem("token", data.access);
    return data;
  };

  logout = async () => {
    await this.client.post("auth/logout");
    // localStorage.removeItem("token");
  };

  getActiveUser = async () => {
    const { data } = await this.client.get("auth/me");
    return data;
  };
}

export default new AuthService();
