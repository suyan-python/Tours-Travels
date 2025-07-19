import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [name, setName] = useState(""); // Add this line at the top inside AddRoom component

  const [address, setAddress] = useState("");

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View ": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Check if all inputs are filled
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", String(inputs.pricePerNight));
      formData.append("packageName", name);
      formData.append("address", address);

      // Converting Amenities to Array & keeping only enabled Amenities
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));
      // Adding Images to FormData
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
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
    <form onSubmit={onSubmitHandler} className="mb-35">
      <Title
        align="left"
        font="outfit"
        title="Add Package"
        subTitle="Fill in the details carefully and accurate package details, pricing, and amenities, to enhance the user booking experience."
      />

      {/* Hotel Name */}
      <div className="w-1/2 mt-9">
        <label htmlFor="name" className="font-medium text-gray-500">
          {" "}
          Package Name
        </label>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
          required
        />
      </div>

      {/* Address */}
      <div className="w-1/2 mt-4">
        <label htmlFor="address" className="font-medium text-gray-500">
          Address
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          id="address"
          type="text"
          placeholder="Type here"
          className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
          required
        />
      </div>

      {/* Upload Area For Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-13 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Package Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            {" "}
            <option value="">Select Package Type</option>
            <option value="3 Nights/ 4 Days">3 Nights/ 4 Days</option>{" "}
            <option value="4 Nights/ 5 Days">4 Nights/ 5 Days</option>{" "}
            <option value="5 Nights/ 6 Days">5 Nights/ 6 Days</option>{" "}
            <option value="6 Nights/ 7 Days">6 Nights/ 7 Days</option>{" "}
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/day</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
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
            <label htmlFor={`amenities${index + 1}`}> {amenity}</label>{" "}
          </div>
        ))}
      </div>
      <button
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Package"}
      </button>
    </form>
  );
};

export default AddRoom;
