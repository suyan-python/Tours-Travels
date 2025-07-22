import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const borderColors = [
  "border-rose-300",
  "border-teal-300",
  "border-indigo-300",
  "border-yellow-300",
];

const Testimonial = () => {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-28">
      <Title
        title="What Our Guests Say"
        subTitle="See why adventurers trust Tour&Travels to craft exclusive and enriching travel experiences across Nepal."
      />

      <div className="flex flex-wrap justify-center gap-10 mt-16 max-w-7xl w-full">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.id}
            className={`bg-white p-6 rounded-3xl border-t-4 ${
              borderColors[index % borderColors.length]
            } shadow-md hover:shadow-xl transition duration-300 max-w-xs w-full flex flex-col`}
            aria-label={`Testimonial from ${testimonial.name}`}
          >
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={testimonial.image}
                alt={`${testimonial.name}'s profile`}
              />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.address}</p>
              </div>
            </div>

            <div className="mt-4">
              <StarRating rating={testimonial.rating} />
            </div>

            <p className="text-gray-700 text-sm mt-4 leading-relaxed italic">
              “{testimonial.review}”
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
