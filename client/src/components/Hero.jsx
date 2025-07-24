import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FiSearch } from "react-icons/fi";

const stats = [
  { label: "Destinations", value: "120+" },
  { label: "Happy Travelers", value: "15,000+" },
  { label: "5-Star Reviews", value: "1,250+" },
];

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();

    const cleanDestination = destination.trim().toLowerCase();
    if (!cleanDestination) return alert("Please enter a destination");

    navigate(`/rooms?destination=${cleanDestination}`);

    try {
      const token = await getToken();
      if (!token) {
        console.warn("Token not found");
        return;
      }

      await axios.post(
        "/api/user/store-recent-search",
        { recentSearchedCity: cleanDestination },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSearchedCities((prev) => {
        const updated = [...prev, cleanDestination];
        if (updated.length > 3) updated.shift();
        return updated;
      });
    } catch (err) {
      console.error("Error storing recent search:", err);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black/70 via-black/50 to-black/60 backdrop-blur-md">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75 "
      >
        <source src="/videos/milkyway.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div
        className={`relative z-10 flex flex-col md:flex-row justify-center items-center h-full text-white px-6 md:px-20 max-w-full mx-auto
        transition-opacity duration-1000 ease-in-out bg-gradient-to-b from-red-800/70 via-black/40  pt-36 lg:pt-40
        ${contentVisible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          {/* Tagline */}
          <p className="bg-primary/70 px-5 py-1 rounded-full text-sm font-semibold w-fit drop-shadow-lg uppercase tracking-wide">
            Your Journey Begins Here
          </p>

          {/* Headline */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mt-6 drop-shadow-xl">
            Adventure Awaits in Nepal
          </h1>

          {/* Description */}
          <p className="max-w-xl mt-4 text-gray-300 text-lg md:text-xl leading-relaxed drop-shadow-md">
            Discover custom tours, adventures, and unforgettable experiences
            made just for you. Explore hidden gems, immerse yourself in rich
            culture, and create memories that last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/about")}
              className="bg-primary hover:bg-primary-dark transition-colors text-white font-semibold rounded-md px-6 py-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/60"
            >
              Learn More
            </button>
            <button
              onClick={() => navigate("/rooms")}
              className="bg-white hover:bg-gray-100 transition-colors text-primary font-semibold rounded-md px-6 py-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/40"
            >
              Explore Packages
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-4">
            {stats.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-bold">{value}</span>
                <span className="uppercase text-xs tracking-wide text-gray-300">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Search Form */}
          <form
            onSubmit={onSearch}
            className="w-full max-w-3xl mx-auto mt-6 lg:mt-16 bg-white text-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row gap-4"
          >
            {/* Destination Input */}
            <div className="flex flex-col flex-grow w-full">
              <label
                htmlFor="destinationInput"
                className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-800"
              >
                <img
                  src={assets.locationIcon}
                  alt="Location"
                  className="h-4 w-4"
                />
                Search Your Destination
              </label>
              <input
                type="text"
                id="destinationInput"
                list="destinations"
                placeholder="e.g. Pokhara, Kathmandu"
                required
                className="w-full px-4 py-3 rounded-lg text-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <datalist id="destinations">
                {cities.map((city, idx) => (
                  <option value={city} key={idx} />
                ))}
              </datalist>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white flex items-center justify-center px-5 py-3 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </form>
        </div>

        {/* Right Side Logo */}
        <div className="hidden md:flex flex-1 justify-center items-center px-10">
          <img
            src="/logo1.png"
            alt="Logo"
            className="max-h-[300px] object-contain drop-shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
