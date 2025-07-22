import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()} ` },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId },
        { headers: { Authorization: `Bearer ${await getToken()} ` } }
      );
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDownloadReceipt = async (bookingId) => {
    try {
      const response = await axios.get(
        `/api/bookings/download-receipt/${bookingId}`,
        {
          responseType: "blob", // Important to receive PDF as binary
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Booking_Receipt_${bookingId}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-24 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming travel bookings in one place."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-slate-300">
        {/* Table Headers */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Packages</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="glass-card grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full py-6 border border-white/20 rounded-xl shadow-md mb-6 px-8"
          >
            {/* Package Info */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room?.images?.[0] || "fallback.jpg"}
                alt="hotel"
                className="md:w-40 rounded object-cover shadow"
              />
              <div className="md:ml-4 mt-3 md:mt-0 space-y-1">
                <h3 className="text-xl font-semibold text-white">
                  {booking.room?.packageName || booking.hotel.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {booking.room?.address || booking.hotel.address}
                </p>
                <p className="text-sm text-gray-300">
                  Guests: {booking.guests}
                </p>
                <p className="text-sm text-gray-200">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex gap-10 mt-4 md:mt-0 items-start md:items-center text-white">
              <div>
                <p className="text-sm font-medium">Check-In</p>
                <p className="text-sm text-gray-300">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Check-Out</p>
                <p className="text-sm text-gray-300">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col items-start justify-center pt-3 md:pt-0 text-white">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <p
                  className={`text-sm ${
                    booking.isPaid ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>
              {!booking.isPaid && (
                <button
                  onClick={() => handlePayment(booking._id)}
                  className="px-4 py-1.5 mt-3 text-xs border border-white/30 text-white rounded-full hover:bg-green-500/30"
                >
                  Pay Now
                </button>
              )}
              <button
                onClick={() => handleDownloadReceipt(booking._id)}
                className="px-4 py-1.5 mt-3 text-xs border border-white/30 text-white rounded-full hover:bg-red-500/30"
              >
                Download Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
