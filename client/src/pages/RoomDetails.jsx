import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { facilityIcons, roomCommonData, assets } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const [isAvailable, setIsAvailable] = useState(false);

  // Check if the Room is Available
  const checkAvailability = async () => {
    try {
      // Check is Check-In Date is greater than Check-Out Date
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);

          toast.success("Package is available");
        } else {
          setIsAvailable(false);

          toast.error("Package is not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // onSubmitHandler function to check availability & book the room

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms]);

  return (
    room && (
      <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-playfair tracking-tight text-white">
            {room.packageName}
          </h1>
          <span className="text-xs font-semibold py-1.5 px-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full shadow-md">
            20% OFF
          </span>
        </div>

        {/* Rating & Address */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-300 text-sm mb-6">
          <div className="flex items-center gap-2">
            <StarRating />
            <span>200+ reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
            <span>{room.address}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div>
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {room.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`h-40 w-full object-cover rounded-xl cursor-pointer transition-all duration-300 shadow-sm ${
                  mainImage === img
                    ? "outline outline-2 outline-orange-400"
                    : ""
                }`}
                alt={`Preview ${i}`}
              />
            ))}
          </div>
        </div>

        {/* Highlights & Amenities */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl font-playfair mb-4">
              Experience Nepal Like Never Before
            </h2>
            <div className="flex flex-wrap gap-3">
              {room.amenities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur text-white text-sm"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-semibold mt-6 md:mt-0 text-orange-400">
            ${room.pricePerNight}{" "}
            <span className="text-base font-normal text-gray-400">/person</span>
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl shadow-xl mb-14"
        >
          <div className="flex flex-col lg:flex-row gap-6 text-white w-full">
            <div className="flex flex-col w-full max-w-[200px]">
              <label htmlFor="checkInDate" className="mb-1 font-medium">
                Check-In
              </label>
              <input
                id="checkInDate"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-white/20 border border-white/30 rounded px-3 py-2 outline-none text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col w-full max-w-[200px]">
              <label htmlFor="checkOutDate" className="mb-1 font-medium">
                Check-Out
              </label>
              <input
                id="checkOutDate"
                type="date"
                required
                min={checkInDate}
                disabled={!checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-white/20 border border-white/30 rounded px-3 py-2 outline-none text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col w-full max-w-[120px]">
              <label htmlFor="guests" className="mb-1 font-medium">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                required
                placeholder="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-white/20 border border-white/30 rounded px-3 py-2 outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 lg:mt-0 bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-8 py-3 rounded-xl shadow-md w-full lg:w-auto"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* Specifications */}
        <div className="space-y-6 mb-14">
          {roomCommonData.map((spec, i) => (
            <div key={i} className="flex items-start gap-4">
              <img src={spec.icon} alt={spec.title} className="w-6 h-6" />
              <div>
                <p className="text-sm text-gray-400">{spec.title}</p>
                <p className="text-base text-white">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="border-t border-b border-white/20 py-10 mb-14">
          <p className="max-w-3xl text-lg text-gray-300 leading-relaxed">
            Travelers will be scheduled based on availability and itinerary
            preferences. Enjoy a well-curated experience that captures the true
            essence of Nepal, combining comfort, culture, and adventure.
          </p>
        </div>

        {/* Host Info */}
        <div className="flex items-start gap-6">
          <img
            src={room.hotel.owner.image}
            alt="Host"
            className="h-16 w-16 rounded-full object-cover border-2 border-white"
          />
          <div>
            <p className="text-xl font-semibold">
              Hosted by {room.hotel.owner.name}
            </p>
            <div className="flex items-center mt-1 text-gray-300 text-sm">
              <StarRating />
              <span className="ml-2">200+ reviews</span>
            </div>
            <button className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 transition rounded-xl text-white font-medium">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
