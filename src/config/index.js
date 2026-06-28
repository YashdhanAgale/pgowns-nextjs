// src/config/index.js
const MERN_APP_URL =
  process.env.NEXT_PUBLIC_MERN_APP_URL || "http://localhost:5173";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export { MERN_APP_URL, API_URL };
