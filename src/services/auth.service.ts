import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/api/user";

class AuthService {
  login(email: string, password: string) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
}

export default new AuthService();
