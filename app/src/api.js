import axios from "axios";

export const Base_Url = "https://cartify-eshop.onrender.com";

const api = axios.create({
  baseURL: Base_Url,
  withCredentials: true,
});

export default api;
