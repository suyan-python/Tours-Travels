import React, { useEffect, useState } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import { Menu, X } from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <Navbar />
      </header>

      {/* Spacer to prevent content behind navbar */}
      <div className="h-[64px] md:h-[72px]" />

      {/* Layout wrapper */}
      <div className="flex flex-1">
        {/* Sidebar with transition */}
        <aside
          className={`
            fixed z-40 inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static bg-white border-r border-gray-200 shadow-lg md:shadow-none
          `}
        >
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-4 pt-22 ">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-600 hover:text-red-500 transition" />
            </button>
          </div>

          <Sidebar />
        </aside>

        {/* Content area */}
        <main className="flex-1 min-h-screen overflow-y-auto px-4 md:px-10 pt-4 md:pt-10 pb-6 transition-all duration-300">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="ml-4 font-semibold text-lg text-gray-700">
              Admin Panel
            </span>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
