import axios from "axios";

const client = axios.create({
  baseURL: "http://34.101.107.164:3000",
  withCredentials: true,
});

export default client;
