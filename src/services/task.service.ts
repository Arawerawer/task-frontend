import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/task";

class TaskService {
  //create
  async post(
    title: string,
    description: string,
    status: string,
    dueDate: string
  ) {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : "";

      const res = await axios.post(
        `${API_URL}/create`,
        { title, description, status, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      console.error("Post API Error:", err);
      throw err;
    }
  }

  async delete(_id: string) {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : "";

      const res = await axios.delete(`${API_URL}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("delete API Error:", err);
      throw err;
    }
  }

  //querry task
  async getByUser(_id: string) {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : "";

      const res = await axios.get(`${API_URL}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("get API Error:", err);
      throw err;
    }
  }
}

export default new TaskService();
