import axios from "axios";

const API_URL = "http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/payroll_invoices";

export default {
  getAll() {
    return axios.get(API_URL);
  },
  get(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  create(data) {
    return axios.post(API_URL, data);
  },
  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
