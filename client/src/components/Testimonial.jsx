import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-28">
      <Title
        title="What Our Guests Say"
        subTitle="See why adventurers trust Tour&Travels to craft exclusive and enriching travel experiences across Nepal."
      />

      <div className="flex flex-wrap justify-center gap-8 mt-16 max-w-[1280px] w-full">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="bg-white p-6 rounded-2xl shadow-lg max-w-xs flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-default"
            aria-label={`Testimonial from ${testimonial.name}`}
          >
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={testimonial.image}
                alt={`${testimonial.name}'s profile`}
              />
              <div>
                <p className="font-playfair text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              <StarRating rating={testimonial.rating} />
            </div>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed italic">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
