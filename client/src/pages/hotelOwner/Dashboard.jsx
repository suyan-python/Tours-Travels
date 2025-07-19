import React, { useState, useEffect } from "react";

import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div className="mb-36 px-4 sm:px-8">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your package listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
        {/* Total Bookings */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center shadow-md">
          <img
            src={assets.totalBookingIcon}
            alt="Bookings"
            className="h-10 hidden sm:block"
          />
          <div className="ml-4">
            <p className="text-gray-700 text-lg font-semibold">
              Total Bookings
            </p>
            <p className="text-2xl text-indigo-600 font-bold">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center shadow-md">
          <img
            src={assets.totalRevenueIcon}
            alt="Revenue"
            className="h-10 hidden sm:block"
          />
          <div className="ml-4">
            <p className="text-gray-700 text-lg font-semibold">Total Revenue</p>
            <p className="text-2xl text-indigo-600 font-bold">
              {currency}
              {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Recent Bookings
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white/40 backdrop-blur-sm max-h-[340px] overflow-y-scroll">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-white/30 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">User Name</th>
              <th className="text-left px-6 py-4 font-semibold max-sm:hidden">
                Package Name
              </th>
              <th className="text-center px-6 py-4 font-semibold">
                Total Amount
              </th>
              <th className="text-center px-6 py-4 font-semibold">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-white/20 transition"
              >
                <td className="px-6 py-4">{item.user.username}</td>
                <td className="px-6 py-4 max-sm:hidden">
                  {item.room?.packageName || "N/A"}
                </td>
                <td className="px-6 py-4 text-center">
                  {currency}
                  {item.totalPrice}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
