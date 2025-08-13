import axios from "axios";

const API_URL = "/api/salaries";

export default {
  // Get all salaries
  getAll() {
    return axios.get(API_URL);
  },

  // Get single salary by ID
  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  // Create a salary
  create(data) {
    return axios.post(API_URL, data);
  },

  // Update salary
  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  },

  // Delete salary
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
