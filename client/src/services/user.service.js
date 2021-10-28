import axios from "../config/axios.config";

const User = {
  async get(id) {
    return await axios.get(`/api/v1/user/${id}`);
  },
  async find(term) {
    return await axios.get(`/api/v1/user/?search=${term}`);
  },
};

export default User;
