import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  updateEmployee,
  getEmployee,
} from "../services/EmployeeService";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(Number(id))
        .then((response) => {
          const emp = response.data;
          setFirstName(emp.firstName);
          setLastName(emp.lastName);
          setEmail(emp.email);
          setRole(emp.role);
          setAge(emp.age);
          setJoiningDate(emp.joiningDate);
          setSalary(emp.salary);
          setDepartment(emp.department);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          setError("Failed to load employee data.");
        });
    }
  }, [id]);

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !role ||
      !age ||
      !joiningDate ||
      !salary ||
      !department
    ) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);

    const employee = {
      firstName,
      lastName,
      email,
      role,
      age: Number(age),
      joiningDate,
      salary: Number(salary),
      department,
    };

    const savePromise = id
      ? updateEmployee(Number(id), employee)
      : createEmployee(employee);

    savePromise
      .then(() => navigate("/employees"))
      .catch((error) => {
        console.error("Error saving employee:", error);
        setError("Something went wrong. Please try again later.");
      })
      .finally(() => setSubmitting(false));
  };

  const title = id ? "Update Employee" : "Add Employee";

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={saveOrUpdateEmployee} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Joining Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border rounded"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {submitting ? "Saving..." : title}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
