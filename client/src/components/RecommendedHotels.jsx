import React, { useEffect } from "react";

import HotelCard from "./HotelCard";
import Title from "./Title";
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
      <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-100 rounded-2xl md:rounded-3xl shadow-md border border-gray-200 mx-2 sm:mx-6 md:mx-16 my-12 sm:my-16 md:my-24 overflow-hidden">
        {/* Title & Description */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <Title title="Recommended Packages" />
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Discover our handpicked selection of exceptional packages across
            Nepal, offering unforgettable travel experiences curated just for
            you.
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
            className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm sm:text-base shadow-md hover:cursor-pointer"
          >
            Explore More Packages
          </button>
        </div>
      </section>
    )
  );
};

export default RecommendedHotels;
