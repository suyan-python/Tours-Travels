import React, { useEffect, useState } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import { Menu, X } from "lucide-react"; // import close icon

const Layout = () => {
  const { isOwner, navigate } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isOwner === false) {
      navigate("/");
    }
  }, [isOwner]);

  if (isOwner === undefined) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar with close button on mobile */}
        <div
          className={`
    fixed z-40 inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static bg-white/80 md:bg-white/100 shadow-xl md:shadow-none rounded-r-3xl md:rounded-none border-r border-gray-200
  `}
        >
          {/* Close Button (only on mobile) */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-700 hover:text-red-500 transition" />
            </button>
          </div>

          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:px-10 pt-8 md:pt-12  min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
