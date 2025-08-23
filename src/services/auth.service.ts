import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/user";

class AuthService {
  async login(email: string, password: string) {
    try {
      const res = await axios.post(API_URL + "/login", {
        email,
        password,
      });

      return res.data;
    } catch (err) {
      console.error("Login API Error:", err);
      throw err;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }
  async register(username: string, email: string, password: string) {
    try {
      const res = await axios.post(API_URL + "/register", {
        username,
        email,
        password,
      });

      return res.data;
    } catch (err) {
      console.error("Register API Error:", err);
      throw err; // 往外拋，讓呼叫端決定怎麼處理
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
}

export default new AuthService();
