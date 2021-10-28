import axios from "../config/axios.config";

const Auth = {
  async authorization() {
    return await axios.get("/api/v1/auth/authorization");
  },
};

export default Auth;
