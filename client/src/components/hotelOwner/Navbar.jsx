import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 shadow-md transition-all duration-300 bg-slate-100 fixed w-full">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-9  opacity-80" />
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
