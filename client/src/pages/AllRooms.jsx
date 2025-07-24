import React, { useState, useMemo, useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });

  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = ["SOLO", "COUPLE", "COUPLE Luxury", "Family Trip"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const handleCheckboxChange = (checked, label, type) => {
    const updater =
      type === "room" ? setSelectedRoomTypes : setSelectedPriceRanges;
    const current = type === "room" ? selectedRoomTypes : selectedPriceRanges;

    if (checked) {
      updater([...current, label]);
    } else {
      updater(current.filter((item) => item !== label));
    }
  };

  // Handle changes for filters and sorting

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Function to check if a room matches the selected room types
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };

  // Function to check if a room matches the selected price ranges
  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  // Function to sort rooms based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }

    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  // Filter Destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;

    const address = room?.address?.toLowerCase().trim();
    const dest = destination.toLowerCase().trim();

    return address?.includes(dest);
  };

  // Filter and sort rooms based on the selected filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  // Clear all filters

  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

  // const handleSortChange = (label) => {
  //   setSelectedSortOption(label);
  // };

  // const handleClearFilters = () => {
  //   setSelectedRoomTypes([]);
  //   setSelectedPriceRanges([]);
  //   setSelectedSortOption('');
  // };

  useEffect(() => {
    console.log(
      "Destination from searchParams:",
      searchParams.get("destination")
    );
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 pt-28 md:pt-32 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      {/* Left - Room Listings */}
      <div className="w-full lg:w-3/4">
        <div className="mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-primary font-bold">
            Our Packages
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mt-3 max-w-2xl leading-relaxed">
            Don’t miss our exclusive tour deals and limited-time packages
            designed to elevate your Nepal journey.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row gap-6 py-8 border-[2px] border-slate-300/30 last:border-0 group transition duration-300 px-4 rounded-2xl"
          >
            {/* Image */}
            <img
              loading="lazy"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt={room.packageName}
              className="h-52 sm:h-60 w-full md:w-1/2 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-90 transition"
            />

            {/* Details */}
            <div className="md:w-1/2 flex flex-col gap-3">
              <h2
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-white text-xl sm:text-2xl md:text-3xl font-playfair cursor-pointer hover:underline"
              >
                {room.packageName}
              </h2>

              <div className="flex items-center text-gray-300 text-sm">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <img
                  src={assets.locationIcon}
                  alt="location"
                  className="w-4 h-4"
                />
                <span>{room.address}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-4 h-4"
                    />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-lg font-semibold text-crimson mt-2 text-primary">
                ${room.pricePerNight}
                <span className="text-sm font-normal text-white/60">
                  {" "}
                  / person
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right - Filters */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-6 shadow-md sticky top-28 z-10">
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-lg">Filters</p>
            <button
              className="text-sm text-red-300 hover:underline"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <p className="font-medium text-base mb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) =>
                  handleFilterChange(checked, range, "priceRange")
                }
              />
            ))}
          </div>

          {/* Sort Options */}
          <div>
            <p className="font-medium text-base mb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
