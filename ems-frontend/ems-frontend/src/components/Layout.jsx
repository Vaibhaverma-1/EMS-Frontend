import HeaderComponent from "./HeaderComponent";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      <main className="flex-grow py-6 px-4">
        <div className="container mx-auto">{children}</div>
      </main>
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Employee Management System. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
