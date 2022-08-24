import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2520",
  timeout: 10000,
});
