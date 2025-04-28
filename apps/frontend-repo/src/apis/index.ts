import axios from "axios"
import { auth } from "@/lib/firebase"

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  timeout: 5000,
})

http.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;