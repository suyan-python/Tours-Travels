import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="group relative w-full rounded-2xl overflow-hidden bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Hotel Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.packageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Badge */}
      {index % 2 === 0 && (
        <p className="absolute top-3 left-3 bg-white text-xs font-semibold text-gray-800 px-3 py-1 rounded-full shadow-md">
          Best Seller
        </p>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 font-playfair line-clamp-1">
            {room.packageName}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            4.5
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span className="line-clamp-1">{room.address}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-base font-medium text-gray-900">
            <span className="text-lg font-semibold">${room.pricePerNight}</span>{" "}
            /person
          </p>
          <button className="px-4 py-1.5 text-sm font-medium text-white bg-[#dc143c] rounded-md hover:bg-[#b51232] transition-all">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
