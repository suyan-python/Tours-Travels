import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const NewsLetter = () => {
  return (
    <div className="relative overflow-hidden isolate flex flex-col items-center max-w-5xl w-full rounded-3xl px-6 py-14 md:py-20 mx-auto my-24 bg-white/10  border border-white/20 shadow-xl text-white">
      {/* Background Gradient Blob */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-gradient-to-br from-[#dc143c] to-[#ff758c] opacity-20 rounded-full blur-3xl"
      ></div>

      <Title
        title="Stay Inspired"
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />

      <form className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 mt-8 max-w-2xl px-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-white/20 text-white border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#dc143c] transition"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[#dc143c] hover:bg-[#ff4f6e] px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 active:scale-95 shadow-md"
        >
          Subscribe
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-4 invert group-hover:translate-x-1 transition-transform"
          />
        </button>
      </form>

      <p className="text-white/50 mt-6 text-xs text-center max-w-sm">
        By subscribing, you agree to our{" "}
        <a href="#" className="underline hover:text-white">
          Privacy Policy
        </a>{" "}
        and consent to receive updates.
      </p>
    </div>
  );
};

export default NewsLetter;
