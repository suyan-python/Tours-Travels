import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CookiesConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentValue = localStorage.getItem("cookiesConsent");

    if (consentValue === "accepted") {
      const acceptedAt = localStorage.getItem("cookiesAcceptedAt");
      const now = Date.now();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

      if (acceptedAt && now - parseInt(acceptedAt, 10) > threeDaysInMs) {
        setShowBanner(true);
      }
    } else if (!consentValue) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "accepted");
    localStorage.setItem("cookiesAcceptedAt", Date.now().toString());
    toast.success("Thank you! Cookies accepted for faster experience!", {
      duration: 4000,
    });
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesConsent", "declined");
    toast("Cookie usage declined. Some features may be limited.", {
      icon: "⚠️",
      duration: 4000,
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-xl rounded-lg p-4 z-50 max-w-sm w-full">
      <p className="text-sm text-gray-700 mb-3">
        We use cookies 🍪 to enhance your experience. Accepting cookies helps us
        load pages faster and offer better content.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleDecline}
          className="text-sm border border-gray-400 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-[#dc143c] hover:bg-red-700 text-white px-4 py-1 text-sm rounded-md transition duration-200"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookiesConsent;
