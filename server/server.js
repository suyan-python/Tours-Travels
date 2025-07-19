import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection before starting
    connectCloudinary(); // Initialize Cloudinary

    const app = express();

    app.use(cors());

    //  API to listen to Stripe Webhooks
    app.post(
      "/api/stripe",
      express.raw({ type: "application/json" }),
      stripeWebhooks
    );

    app.use(express.json());
    app.use(clerkMiddleware());

    // Clerk webhook route
    app.use("/api/clerk", clerkWebhooks);

    // API routes
    app.use("/api/user", userRouter);
    app.use("/api/hotels", hotelRouter);
    app.use("/api/rooms", roomRouter);
    app.use("/api/bookings", bookingRouter);

    app.get("/", (req, res) => {
      res.send("API is working");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // Exit process on DB failure
  }
};

startServer();
