import axios from "axios";

const API = axios.create({
  baseURL:
    "https://ai-chat-backend-q23e.onrender.com/api",
});
export default API;