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

const highlights = [
  { icon: <FaMountain className="text-4xl mb-2" />, label: "Himalayan Treks" },
  {
    icon: <FaPagelines className="text-4xl mb-2" />,
    label: "Cultural Heritage",
  },
  { icon: <FaCampground className="text-4xl mb-2" />, label: "Eco Retreats" },
  { icon: <FaHiking className="text-4xl mb-2" />, label: "Adventure Tours" },
];

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <section className="relative z-10 min-h-screen flex flex-col items-center px-6 md:px-16 lg:px-24 py-24 overflow-hidden">
        {/* Background Blur Image */}
        <div className="absolute inset-0 z-[-1]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(5px) brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-black/30 z-[-1]" />
        </div>

        {/* Section Title */}
        <Title title="Featured Destinations" />
        <div className="w-24 h-1 bg-white my-4 rounded-full" />

        {/* Description */}
        <p className="text-gray-200 max-w-2xl text-center text-lg mb-4">
          Discover our handpicked selection of exceptional packages around
          Nepal.
        </p>
        <p className="text-white/90 text-center max-w-3xl mt-2 mb-8 leading-relaxed">
          Nepal is a land of breathtaking landscapes, rich culture, and
          thrilling adventures. From the majestic Himalayas to serene lakes and
          historic temples, each destination offers a unique story waiting to be
          explored.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-white hover:scale-105 transition-transform duration-300"
            >
              <div className="text-white/90">{item.icon}</div>
              <p className="font-semibold text-sm mt-1 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1280px]">
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            navigate("/rooms");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-14 px-8 py-3 font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg backdrop-blur-md transition-all duration-300 shadow-md"
        >
          View All Destinations
        </button>
      </section>
    )
  );
};

export default FeaturedDestination;
