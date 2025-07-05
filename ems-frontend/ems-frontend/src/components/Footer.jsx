const Footer = ({ className }) => {
  return (
    <footer className={`bg-gray-800 text-white py-4 mt-auto ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <span>
          &copy; {new Date().getFullYear()} Employee Management System. All
          rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
