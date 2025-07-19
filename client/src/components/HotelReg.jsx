import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `/api/hotels/`,
        { name, contact, address, city },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 overflow-auto"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Left image */}
        <img
          src={assets.regImage}
          alt="Register Hotel"
          className="hidden md:block md:w-1/2 object-cover"
        />

        {/* Right form */}
        <div className="relative flex flex-col gap-4 p-6 md:p-10 w-full md:w-1/2">
          {/* Close icon */}
          <img
            src={assets.closeIcon}
            alt="Close"
            onClick={() => setShowHotelReg(false)}
            className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          />

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Register Your Hotel
          </h2>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Hotel Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Grand Everest Hotel"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. +1 234 567 890"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 123 Street Name, Area"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-gray-700"
            >
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select your city</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
