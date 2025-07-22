import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#F6F9FC] text-gray-600 pt-12 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Top section */}
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        {/* Branding */}
        <div className="max-w-sm">
          <img src={assets.logo} alt="logo" className="mb-4 h-9" />
          <p className="text-sm leading-relaxed">
            Journey through Nepal’s finest travel spots, handpicked for comfort,
            culture, and adventure.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { src: assets.instagramIcon, alt: "Instagram" },
              { src: assets.facebookIcon, alt: "Facebook" },
              { src: assets.twitterIcon, alt: "Twitter" },
              { src: assets.linkendinIcon, alt: "LinkedIn" },
            ].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-white border hover:bg-black hover:invert transition flex items-center justify-center"
              >
                <img src={icon.src} alt={icon.alt} className="w-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <p className="font-semibold text-gray-800 mb-3">Company</p>
          <ul className="text-sm space-y-2">
            {["About", "Careers", "Press", "Blog", "Partners"].map(
              (item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-black transition">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support links */}
        <div>
          <p className="font-semibold text-gray-800 mb-3">Support</p>
          <ul className="text-sm space-y-2">
            {[
              "Help Center",
              "Safety Information",
              "Cancellation Options",
              "Contact Us",
              "Accessibility",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-black transition">
                  {item}
                </a>
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
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 h-10 text-sm bg-white border border-gray-300 rounded-l-md outline-none"
            />
            <button className="bg-black rounded-r-md px-3 flex items-center justify-center">
              <img src={assets.arrowIcon} alt="Submit" className="w-4 invert" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-10" />

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3 py-6">
        <p>© {new Date().getFullYear()} Tour&Travels. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Sitemap"].map((item, i) => (
            <li key={i}>
              <a href="#" className="hover:text-black transition">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
