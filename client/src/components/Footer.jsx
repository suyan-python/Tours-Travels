import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    // Handle your newsletter subscription logic here
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-[#F6F9FC] text-gray-600 pt-12 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Top section */}
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        {/* Branding */}
        <div className="max-w-sm">
          <img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-9 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-sm leading-relaxed">
            Journey through Nepal’s finest travel spots, handpicked for comfort,
            culture, and adventure.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              {
                src: assets.instagramIcon,
                alt: "Instagram",
                link: "https://instagram.com",
              },
              {
                src: assets.facebookIcon,
                alt: "Facebook",
                link: "https://facebook.com",
              },
              {
                src: assets.twitterIcon,
                alt: "Twitter",
                link: "https://twitter.com",
              },
              {
                src: assets.linkendinIcon,
                alt: "LinkedIn",
                link: "https://linkedin.com",
              },
            ].map((icon, i) => (
              <a
                key={i}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border hover:bg-black hover:invert transition flex items-center justify-center"
              >
                <img src={icon.src} alt={icon.alt} className="w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold text-gray-800 mb-3">Company</p>
          <ul className="text-sm space-y-2">
            {[
              { label: "Our Team", path: "/about" },
              { label: "Contact", path: "/contact" },
              { label: "Packages", path: "/rooms" },
              { label: "My-Bookings", path: "/my-bookings" },
            ].map(({ label, path }, i) => (
              <li key={i}>
                <button
                  onClick={() => navigate(path)}
                  className="hover:text-black transition text-left"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="font-semibold text-gray-800 mb-3">Support</p>
          <ul className="text-sm space-y-2">
            {[
              { label: "FAQs", path: "/faq" },
              { label: "Help Center", path: "/help" },
              { label: "Cancellation Policy", path: "/cancellation" },
              { label: "Terms & Conditions", path: "/terms" },
              { label: "Privacy Policy", path: "/privacy" },
            ].map(({ label, path }, i) => (
              <li key={i}>
                <button
                  onClick={() => navigate(path)}
                  className="hover:text-black transition text-left"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-sm">
          <p className="font-semibold text-gray-800 mb-3">Stay Updated</p>
          <p className="text-sm mb-4 leading-relaxed">
            Subscribe to our newsletter for travel inspiration and exclusive
            offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 h-10 text-sm bg-white border border-gray-300 rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-black rounded-r-md px-3 flex items-center justify-center"
            >
              <img src={assets.arrowIcon} alt="Submit" className="w-4 invert" />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-10" />

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3 py-6">
        <p>© {new Date().getFullYear()} Tours&Travels. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          {[
            { label: "Privacy", path: "/privacy" },
            { label: "Terms", path: "/terms" },
            { label: "Sitemap", path: "/sitemap" },
          ].map(({ label, path }, i) => (
            <li key={i}>
              <button
                onClick={() => navigate(path)}
                className="hover:text-black transition"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
