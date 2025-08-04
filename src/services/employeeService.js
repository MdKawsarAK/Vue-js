// src/services/employeeService.js
import axios from 'axios';

const BASE_URL = 'http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/employees';

export const fetchEmployeesList = (params = {}) => {
  return axios.get(BASE_URL, { params });
};

export const getEmployeeById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const createEmployee = (data) => {
  return axios.post(BASE_URL, data, {
  });
};


export const updateEmployee = (id, data) => {
  return axios.post(`${BASE_URL}/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteEmployeeById = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const fetchCategories = () => {
  return axios.get('/api/categories');
};

export const fetchBloodGroups = () => {
  return axios.get('/api/bloods');
};
