import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
    { name: "Packages", path: "/rooms" },
    { name: "Hotels", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();

  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // scrolling up — reset immediately
        setIsScrolled(false);
      } else if (currentScrollY > 10) {
        // scrolling down past 10px
        setIsScrolled(true);
      }
      lastScrollY = currentScrollY;
    };

    // Initialize on route load
    if (location.pathname !== "/") {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-3 left-0 w-full z-50 flex justify-center pointer-events-auto"
      style={{ willChange: "transform, height" }}
    >
      {/* Inner wrapper with background and dynamic size */}
      <div
        className={`flex items-center justify-between shadow-lg top-0
          transition-all duration-500
          ${
            isScrolled
              ? "h-14 rounded-full max-w-[720px] px-8 bg-white"
              : "h-20 rounded-none max-w-full px-6 md:px-12"
          }`}
        style={{ width: "100%", maxWidth: isScrolled ? "1200px" : "100%" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center transition-opacity duration-500"
          aria-label="Home"
        >
          <img
            src={assets.logo}
            alt="logo"
            className={`h-8 md:h-10 transition-opacity duration-500 ${
              isScrolled ? "opacity-90" : "opacity-100"
            }`}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-primary/90"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-[-6px] left-0 h-0.5 bg-primary rounded-full transition-all duration-300 w-0 group-hover:w-full`}
              />
            </Link>
          ))}

          {user && (
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
              className={`text-sm font-medium rounded-full border px-5 py-1.5 transition-colors duration-300 ${
                isScrolled
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-white text-white hover:bg-gray-200"
              }`}
            >
              {isOwner ? "Dashboard" : "List Your Package"}
            </button>
          )}
        </div>

        {/* Desktop Right: Search + User */}
        <div className="hidden md:flex items-center gap-6">
          <img
            src={assets.searchIcon}
            alt="search"
            className={`h-6 cursor-pointer transition-all duration-500 ${
              isScrolled ? "invert" : "invert-0 brightness-150"
            }`}
          />

          {user ? (
            <UserButton>
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
              className="bg-primary px-6 py-2 rounded-full text-white font-medium hover:bg-primary-dark transition hover:cursor-pointer hover:bg-red-700"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Nav Button */}
        <div className="flex md:hidden items-center gap-4">
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className={`p-1 rounded-md transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-200"
                : "text-gray-900 hover:bg-gray-200"
            }`}
          >
            <img
              src={assets.menuIcon}
              alt="menu"
              className={`h-5 w-5 transition-all duration-500 ${
                isScrolled ? "invert-0" : "invert"
              }`}
            />
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-lg z-40 rounded-md mx-4 py-4 px-6 flex flex-col gap-4 transition-all duration-300`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
              className="text-gray-800 font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                isOwner ? navigate("/owner") : setShowHotelReg(true);
              }}
              className="w-full text-left text-primary font-semibold border border-primary rounded-md px-4 py-2 hover:bg-primary/10 transition"
            >
              {isOwner ? "Dashboard" : "List Your Package"}
            </button>
          )}

          {!user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openSignIn();
              }}
              className="w-full text-white bg-primary hover:bg-primary-dark font-medium rounded-md px-4 py-2 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
