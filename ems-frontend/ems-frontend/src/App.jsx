import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import Form from "./components/Form"; // employee form component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<Form />} />
          <Route path="/edit-employee/:id" element={<Form />} />
          <Route path="*" element={<Navigate to="/employees" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
