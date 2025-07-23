import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const listEmployees = () => axios.get(`${BASE_URL}/employees`);

export const createEmployee = (employee) => axios.post(`${BASE_URL}/employees`, employee);

export const getEmployee = (id) => axios.get(`${BASE_URL}/employees/${id}`);

export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/employees/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/employees/${id}`);
