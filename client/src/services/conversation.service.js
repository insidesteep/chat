import axios from "../config/axios.config";

const Conversation = {
  async list() {
    return await axios.get(`/api/v1/conversations`);
  },
};

export default Conversation;
