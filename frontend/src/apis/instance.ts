import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosFileInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-type": "multipart/form-data",
  },
});
