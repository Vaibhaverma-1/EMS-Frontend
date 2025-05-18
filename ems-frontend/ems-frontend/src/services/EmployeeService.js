import axios from "axios"

const BASE_URL = "http://localhost:8081/api/employees"

export const listEmployees = () => axios.get(BASE_URL)

export const createEmployee = (employee) => axios.post(BASE_URL, employee)

export const getEmployee = (id) => axios.get(`${BASE_URL}/${id}`)

export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/${id}`, employee)

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`)
