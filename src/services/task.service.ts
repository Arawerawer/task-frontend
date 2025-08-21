import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/task";

class TaskService {
  //create
  post(title: string, description: string, status: string, dueDate: string) {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : "";

    return axios.post(
      `${API_URL}/create`,
      { title, description, status, dueDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  delete(_id: string) {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : "";

    return axios.delete(`${API_URL}/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //querry task
  getByUser(_id: string) {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : "";

    return axios.get(`${API_URL}/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new TaskService();
