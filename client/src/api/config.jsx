// src/api/config.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const config = axios.create({
  baseURL,
});

config.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // ✅ get token from stored user object
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default config;
