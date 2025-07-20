import React from "react";
import Hero from "../components/Hero";
import FeatureDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureDestination />
      <RecommendedHotels />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
