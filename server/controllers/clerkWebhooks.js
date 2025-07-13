import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body; // raw buffer
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    console.log("📨 Webhook event received:", type);

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
      image: data.image_url,
      recentSearchedCities: [],
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
