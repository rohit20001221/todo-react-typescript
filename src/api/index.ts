import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export default axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
