import React, { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    // Only redirect after we know isOwner is false (not undefined/null)
    if (isOwner === false) {
      navigate("/");
    }
  }, [isOwner]);

  if (isOwner === undefined) {
    return null; // or a loader while checking
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
