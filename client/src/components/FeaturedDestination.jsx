import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    <section className="relative z-10 flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 mx-4 md:mx-16 lg:mx-48 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-white/10 backdrop-blur-lg border border-white/20 my-48">
      {/* Title */}
      <Title title="Featured Destinations" />
      <span className="text-gray-700">
        Discover our handpicked selection of exceptional packages around Nepal,
        offering unparalleled luxury and unforgettable experiences.
      </span>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-16 max-w-[1280px] w-full">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => {
          navigate("/rooms");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-16 px-6 py-3 font-semibold border border-white/30 rounded-lg bg-white/20 text-white hover:bg-white/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
        aria-label="View all destinations"
      >
        View All Destinations
      </button>
    </section>
  );
};

export default FeaturedDestination;
