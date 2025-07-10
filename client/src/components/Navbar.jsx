import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(location.pathname !== "/" ? true : false);
      }
    };

    handleScroll(); // Call initially
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-full px-4 md:px-10 lg:px-20 flex items-center justify-between transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/50 backdrop-blur-sm shadow-lg text-primary py-2.5 rounded-full "
          : "bg-primary text-white py-5"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-10 transition duration-300 ${
            !isScrolled ? "invert brightness-200" : ""
          }`}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="relative group text-sm font-medium hover:text-primary-dark transition-colors duration-300"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300" />
          </Link>
        ))}

        <button
          className={`px-5 py-2 rounded-full border border-transparent hover:border-white hover:bg-primary/10 transition-colors duration-300 ${
            isScrolled ? "text-primary" : "text-white"
          }`}
          onClick={() => navigate("/owner")}
        >
          Dashboard
        </button>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => navigate("/search")}
          className={`transition-transform duration-300 hover:scale-110`}
        >
          <img
            src={assets.searchIcon}
            alt="search"
            className={`h-6 rounded ${!isScrolled ? "invert" : ""}`}
          />
        </button>

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          <img
            src={isMenuOpen ? assets.closeIcon : assets.menuIcon}
            alt="menu"
            className={`h-6 transition duration-300 ${
              !isScrolled ? "invert" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`hidden fixed top-0 left-0 w-full h-screen bg-white text-primary mg:flex flex-col items-center justify-center gap-8 text-lg font-medium transition-transform duration-500 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-primary/10 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6 w-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary-dark transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}

        <button
          className="px-6 py-2 border border-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/owner");
          }}
        >
          Dashboard
        </button>

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/my-bookings");
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openSignIn();
            }}
            className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
