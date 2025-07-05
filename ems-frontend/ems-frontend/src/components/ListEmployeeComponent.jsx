import { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    setLoading(true);
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees. Please try again later.");
        setLoading(false);
      });
  };

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`);
  }

  function showNotification(message, type = "success") {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function removeEmployee(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
        .then(() => {
          getAllEmployees();
          showNotification("Employee deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          showNotification("Failed to delete employee", "error");
        });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <p className="flex items-center">
            {notification.type === "error" && (
              <FiAlertCircle className="mr-2" />
            )}
            {notification.message}
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">List of Employees</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          onClick={addNewEmployee}
        >
          <FiPlus className="h-5 w-5" />
          Add Employee
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p className="flex items-center">
            <FiAlertCircle className="mr-2" />
            {error}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No employees found. Add your first employee to get
                      started.
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md mr-2 transition-colors"
                          onClick={() => updateEmployee(employee.id)}
                        >
                          <span className="flex items-center gap-1">
                            <FiEdit2 className="h-4 w-4" />
                            Update
                          </span>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
                          onClick={() => removeEmployee(employee.id)}
                        >
                          <span className="flex items-center gap-1">
                            <FiTrash2 className="h-4 w-4" />
                            Delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;
