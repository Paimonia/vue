import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization", "Access-Control-Allow-Origin"] = `Bearer ${token}`;
}

export default axios;