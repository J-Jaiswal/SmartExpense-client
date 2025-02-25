import Axios from "axios";

const API = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL without `/api`
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
