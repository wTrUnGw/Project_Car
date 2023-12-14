import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
});

export default baseAPI;
