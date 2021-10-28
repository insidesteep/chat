import Axios from "axios";
import cookie from "js-cookie";


const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookie.get("token")}`,
  },
});

export default axiosInstance;
