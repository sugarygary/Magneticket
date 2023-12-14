import axios from "axios";

const client = axios.create({
  baseURL: "http://0.0.0.0:3000",
  withCredentials: true,
});

export default client;
