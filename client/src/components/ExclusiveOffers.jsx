import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-24 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1280px]">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your journey and create unforgettable memories."
        />
        <button
          className="group flex items-center gap-2 font-semibold text-primary hover:text-primary-dark transition-colors mt-8 md:mt-0"
          aria-label="View all offers"
        >
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow icon"
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-[1280px] w-full">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="relative flex flex-col justify-between rounded-2xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label={`${item.title} - ${item.priceOff}% off`}
          >
            {/* Price Off Badge */}
            <span className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md">
              {item.priceOff}% OFF
            </span>

            {/* Content overlay */}
            <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col h-full justify-end rounded-2xl">
              <h3 className="text-white text-2xl font-playfair font-semibold mb-2 drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-white/90 mb-4 text-sm leading-relaxed drop-shadow-sm">
                {item.description}
              </p>
              <p className="text-white/60 text-xs mb-6 tracking-wide">
                Expires {item.expiryDate}
              </p>
              <button
                className="inline-flex items-center gap-2 font-semibold text-white bg-primary rounded-full px-5 py-2 shadow-lg hover:bg-primary-dark transition-colors duration-300"
                aria-label={`View offers for ${item.title}`}
              >
                View Offers
                <img
                  className="w-4 h-4 filter invert transition-transform duration-300 group-hover:translate-x-1"
                  src={assets.arrowIcon}
                  alt="arrow icon"
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
