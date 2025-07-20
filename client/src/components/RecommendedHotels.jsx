import React, { useEffect } from "react";

import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const RecommendedHotels = () => {
  const { rooms, searchedCities, navigate } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter(
        (room) =>
          room.address &&
          searchedCities.some(
            (city) =>
              city.toLowerCase().trim() === room.address.toLowerCase().trim()
          )
      );
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-white/10 backdrop-blur-md md:backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-md md:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 mx-2 sm:mx-6 md:mx-16 my-12 sm:my-16 md:my-24 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/40 rounded-2xl md:rounded-3xl" />

        {/* Title & Description */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-playfair">
            Recommended Packages
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
            Discover our handpicked selection of exceptional packages across
            Nepal, offering unforgettable travel experiences.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            onClick={() => {
              navigate("/rooms");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all duration-300 text-sm sm:text-base"
          >
            Explore More Packages
          </button>
        </div>
      </section>
    )
  );
};

export default RecommendedHotels;
