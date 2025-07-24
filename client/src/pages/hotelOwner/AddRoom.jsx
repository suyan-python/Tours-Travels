import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken, currency } = useAppContext();

  // State for package name and address
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // State for images: 4 image slots, initially null
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  // Inputs: package type, price, and amenities toggles
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  // Handler for form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation: all fields and at least one image required
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !name.trim() ||
      !address.trim() ||
      !Object.values(images).some((image) => image !== null)
    ) {
      toast.error(
        "Please fill in all the details and upload at least one image."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", String(inputs.pricePerNight));
      formData.append("packageName", name);
      formData.append("address", address);

      // Convert amenities object to array of enabled amenities
      const selectedAmenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(selectedAmenities));

      // Append all images to formData
      Object.entries(images).forEach(([key, image]) => {
        if (image) formData.append("images", image);
      });

      // POST request to backend
      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success("Package added successfully!");

        // Reset form fields
        setName("");
        setAddress("");
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mb-36 px-4 sm:px-8 backdrop-blur-md  rounded-3xl"
    >
      <Title
        align="left"
        font="outfit"
        title="Add Package"
        subTitle="Fill in the details carefully and accurately to enhance the booking experience with appealing packages and amenities."
      />

      {/* Package Name */}
      <div className="w-full sm:w-2/3 mt-10">
        <label htmlFor="name" className="font-semibold text-slate-700">
          Package Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Himalayan Adventure Retreat"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl bg-white/30 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />
      </div>

      {/* Address */}
      <div className="w-full sm:w-2/3 mt-6">
        <label htmlFor="address" className="font-semibold text-slate-700">
          Address
        </label>
        <input
          id="address"
          type="text"
          placeholder="e.g. Pokhara, Nepal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl bg-white/30 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />
      </div>

      {/* Upload Images */}
      <p className="mt-10 font-semibold text-slate-700">Upload Images</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        {Object.keys(images).map((key) => (
          <label
            htmlFor={`roomImage${key}`}
            key={key}
            className="cursor-pointer border border-dashed border-gray-300 rounded-xl bg-white/30 backdrop-blur-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt="Upload preview"
              className="w-full h-32 object-cover opacity-80"
            />
            <input
              id={`roomImage${key}`}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Package Type and Price */}
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <div className="flex-1">
          <label className="text-slate-700 font-semibold mb-1 block">
            Package Type
          </label>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/30 text-black backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Package Type</option>
            <option value="3 Nights/ 4 Days">3 Nights / 4 Days</option>
            <option value="4 Nights/ 5 Days">4 Nights / 5 Days</option>
            <option value="5 Nights/ 6 Days">5 Nights / 6 Days</option>
            <option value="6 Nights/ 7 Days">6 Nights / 7 Days</option>
          </select>
        </div>

        <div className="w-40">
          <label className="text-slate-700 font-semibold mb-1 block">
            {currency} Price{" "}
            <span className="text-sm text-slate-700">/person</span>
          </label>
          <input
            type="number"
            placeholder="0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: Number(e.target.value) })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            min={0}
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-slate-700 font-semibold mt-10 mb-2">
        Select Amenities
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 max-w-lg">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <span className="text-sm">{amenity}</span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-xl mt-10 transition-all shadow-lg disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Package"}
      </button>
    </form>
  );
};

export default AddRoom;
