import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const client: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
);
