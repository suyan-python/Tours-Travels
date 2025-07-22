import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-100 via-white to-gray-100 py-20 px-4 md:px-10 lg:px-20 xl:px-32">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your journey and create unforgettable memories."
        />
        <button
          className="flex items-center gap-2 font-semibold text-primary hover:text-primary-dark transition-all group"
          aria-label="View all offers"
        >
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow icon"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 max-w-[1280px] mx-auto">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="relative group rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center h-[420px] transform hover:scale-[1.02] transition-transform duration-300"
            style={{ backgroundImage: `url(${item.image})` }}
            aria-label={`${item.title} - ${item.priceOff}% off`}
          >
            {/* Glass Badge */}
            <span className="absolute top-5 left-5 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-20">
              {item.priceOff}% OFF
            </span>

            {/* Glassmorphic Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/40 transition-all duration-300">
              <h3 className="text-white text-2xl font-semibold font-playfair mb-2 drop-shadow-lg">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base mb-2 leading-snug">
                {item.description}
              </p>
              <p className="text-white/60 text-xs mb-4">
                Expires {item.expiryDate}
              </p>
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary px-5 py-2 rounded-full hover:bg-primary-dark transition-colors shadow-lg"
                aria-label={`View offers for ${item.title}`}
              >
                View Offers
                <img
                  src={assets.arrowIcon}
                  alt="arrow"
                  className="w-4 h-4 filter invert transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
