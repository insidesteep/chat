import axios from "../config/axios.config";

const Message = {
  async create(formData) {
    return await axios.post(`/api/v1/messages`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async get(id) {
    return await axios.get(`/${id}`);
  },
  async list(conversionId) {
    return await axios.get(`/api/v1/messages/conversation/${conversionId}`);
  },
  async set(id, data) {
    return await axios.post(`/${id}`, data);
  },

  async remove(id) {
    return await axios.delete(`/${id}`);
  },
  async clear() {
    return await axios.delete("/");
  },
};

export default Message;
