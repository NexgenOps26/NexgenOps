import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? "https://nexgenops26.onrender.com/api";

export default axios.create({
  baseURL,
});