import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

const HeaderComponent = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <FiUsers className="h-6 w-6" />
            <span>Employee Management System</span>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
