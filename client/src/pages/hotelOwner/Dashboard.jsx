import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { currency, user, getToken, axios } = useAppContext();

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

  const chartData = dashboardData.bookings.slice(0, 5).map((b) => ({
    name: b.user.username,
    amount: b.totalPrice,
  }));

  return (
    <div className="mb-36 px-4 sm:px-8">
      <Title
        align="left"
        font="outfit"
        title="Admin Dashboard"
        subTitle="Track your listings and bookings through intelligent visuals and insights."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        <div className="bg-gradient-to-br from-indigo-500/50 to-purple-600/20 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-lg font-semibold">Total Bookings</p>
          <p className="text-3xl font-bold mt-2">
            {dashboardData.totalBookings}
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-500/30 to-emerald-600/40 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-lg font-semibold">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">
            {currency}
            {dashboardData.totalRevenue}
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-400/50 to-orange-500/60 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-lg font-semibold">Recent Users</p>
          <p className="text-3xl font-bold mt-2">
            {dashboardData.bookings.length}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Booking Revenue
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white/30 max-h-[360px] overflow-y-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">User</th>
              <th className="text-left px-6 py-4 font-semibold max-sm:hidden">
                Package
              </th>
              <th className="text-center px-6 py-4 font-semibold">Amount</th>
              <th className="text-center px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {dashboardData.bookings.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.user.username}
                </td>
                <td className="px-6 py-4 max-sm:hidden whitespace-nowrap">
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
