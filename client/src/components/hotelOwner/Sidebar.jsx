import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Package", path: "/owner/add-room", icon: assets.addIcon },
    {
      name: "List Of Package",
      path: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];

  return (
    <aside className="md:w-64 w-20 bg-white border-r border-gray-200 shadow-sm h-screen px-2 flex flex-col z-50 relative">
      <nav className="space-y-2">
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-6 h-6 opacity-80 group-hover:opacity-100 transition"
            />
            <span className="hidden md:inline text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
