import axios from "axios";

// export const BASE_URL = "http://localhost:5000";
export  const BASE_URL = "https://modmanapis.vercel.app";

// 🔹 API client (for all /api routes)
const httpClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
