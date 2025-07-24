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

  // Toggle Availability of the Room
  const toggleAvailability = async (roomId) => {
    try {
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
    } catch (error) {
      toast.error(error.message);
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

      <p className="text-gray-700 mt-8 mb-4 font-medium">All Packages</p>

      <div className="w-full max-w-3xl lg:max-w-7xl rounded-2xl border border-gray-300 bg-white shadow-lg max-h-80 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-semibold text-left">
                Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-semibold text-left max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-semibold text-left">
                Price / person
              </th>
              <th className="py-3 px-4 text-gray-800 font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  No packages found.
                </td>
              </tr>
            ) : (
              rooms.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 border-t border-gray-200">
                    {item.packageName}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 max-sm:hidden">
                    {item.amenities.join(", ")}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200">
                    {currency}
                    {item.pricePerNight}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-center">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                        onChange={() => toggleAvailability(item._id)}
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-6 transition-transform duration-200"></span>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
