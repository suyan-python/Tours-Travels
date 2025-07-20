import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import {
  FaHiking,
  FaCampground,
  FaPagelines,
  FaMountain,
} from "react-icons/fa";
import backgroundImg from "../../src/assets/background.jpg";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <section className="relative z-10 min-h-screen flex flex-col items-center px-6 md:px-16 lg:px-24 py-24 sm:mx-4 md:mx-16 lg:mx-0 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-white/10 backdrop-blur-lg border border-white/20  overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-[-1] ">
          <div
            className="absolute inset-0 z-[-1]"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(6px) brightness(0.8)",
            }}
          />
        </div>

        {/* Title */}
        <Title title="Featured Destinations" />
        <div className="w-24 h-1 bg-white my-4 rounded-full"></div>

        {/* Subtitle */}
        <p className="text-gray-200 max-w-2xl text-center text-lg mb-6">
          Discover our handpicked selection of exceptional packages around
          Nepal, offering unparalleled luxury and unforgettable experiences.
        </p>

        {/* Why Visit Nepal */}
        <p className="text-white/90 text-center max-w-3xl mt-2 mb-5 leading-relaxed">
          Nepal is a land of breathtaking landscapes, rich culture, and
          thrilling adventures. From the majestic Himalayas to serene lakes and
          historic temples, each destination offers a unique story waiting to be
          explored.
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-10 text-white mb-10">
          <div className="flex flex-col items-center">
            <FaMountain className="text-4xl mb-2" />
            <p className="font-semibold">Himalayan Treks</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPagelines className="text-4xl mb-2" />
            <p className="font-semibold">Cultural Heritage</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCampground className="text-4xl mb-2" />
            <p className="font-semibold">Eco Retreats</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHiking className="text-4xl mb-2" />
            <p className="font-semibold">Adventure Tours</p>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 max-w-[1280px] w-full">
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
    )
  );
};

export default FeaturedDestination;
