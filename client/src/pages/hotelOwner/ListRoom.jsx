import React, { useState, useEffect } from "react";

import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } = useAppContext();

  // Fetch Rooms of the Hotel Owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Toggle Availability of the Room

  const toggleAvailability = async (roomId) => {
    const { data } = await axios.post(
      "/api/rooms/toggle-availability",
      { roomId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    if (data.success) {
      toast.success(data.message);
      fetchRooms();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Package Listings"
        subTitle="View, edit, or manage all listed packages. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="text-gray-500 mt-8">All Packages</p>

      <div className="w-full max-w-3xl text-left mt-3 mb-35 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md shadow-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-white/10 backdrop-blur-sm">
            <tr>
              <th className="py-3 px-4 text-gray-100 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-100 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-100 font-medium">
                Price / day
              </th>
              <th className="py-3 px-4 text-gray-100 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index} className="hover:bg-white/5 transition">
                <td className="py-3 px-4 text-white border-t border-white/20">
                  {item.packageName}
                </td>
                <td className="py-3 px-4 text-white border-t border-white/20 max-sm:hidden">
                  {item.amenities.join(",")}
                </td>
                <td className="py-3 px-4 text-white border-t border-white/20">
                  {currency}
                  {item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-white/20 text-sm text-white text-center">
                  <label className="relative inline-flex items-center cursor-pointer gap-3">
                    <input
                      onChange={() => toggleAvailability(item._id)}
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-white/20 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
