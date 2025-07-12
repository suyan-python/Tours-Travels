import Booking from "../models/booking.js";
import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
// import transporter from "../configs/nodemailer.js";
// import Stripe from "stripe";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    const roomData = await Room.findById(room).populate("hotel");

    // if (!roomData || !roomData.hotel) {
    //   return res.json({ success: false, message: "Room or Hotel not found" });
    // }

    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
      //   status: "pending",
      //   paymentMethod: "Pay At Hotel",
      //   isPaid: false,
    });

    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: req.user.email,
    //   subject: "Hotel Booking Details",
    //   html: `
    //     <h2>Your Booking Details</h2>
    //     <p>Dear ${req.user.username},</p>
    //     <p>Thank you for your booking! Here are your details:</p>
    //     <ul>
    //       <li><strong>Booking ID:</strong> ${booking._id}</li>
    //       <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
    //       <li><strong>Location:</strong> ${roomData.hotel.address}</li>
    //       <li><strong>Check-In Date:</strong> ${new Date(
    //         booking.checkInDate
    //       ).toDateString()}</li>
    //       <li><strong>Check-Out Date:</strong> ${new Date(
    //         booking.checkOutDate
    //       ).toDateString()}</li>
    //       <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${
    //     booking.totalPrice
    //   }</li>
    //     </ul>
    //     <p>We look forward to welcoming you!</p>
    //     <p>If you need to make any changes, feel free to contact us.</p>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to create Booking" });
  }
};

// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// POST /api/bookings/stripe-payment

// export const stripePayment = async (req, res) => {
//   try {
//     const { bookingId } = req.body;
//     const booking = await Booking.findById(bookingId);
//     if (!booking)
//       return res.json({ success: false, message: "Booking not found" });

//     const roomData = await Room.findById(booking.room).populate("hotel");
//     if (!roomData || !roomData.hotel)
//       return res.json({ success: false, message: "Room or Hotel not found" });

//     const { origin } = req.headers;

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: roomData.hotel.name,
//             },
//             unit_amount: booking.totalPrice * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${origin}/loader/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       metadata: {
//         bookingId,
//       },
//     });

//     res.json({ success: true, url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Payment Failed" });
//   }
// };
