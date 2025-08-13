import axios from "axios";

export const Base_Url = "http://localhost:3000";

const api = axios.create({
  baseURL: Base_Url,
  withCredentials: true,
});

export default api;
