import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/task";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

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

  async getTask() {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : "";

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("getTask API Error:", err);
      throw err;
    }
  }

  async editTask(_id: string, data: Partial<Task>) {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : "";

      const res = await axios.patch(`${API_URL}/${_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("edit API Error:", err);
      throw err;
    }
  }
}

export default new TaskService();
