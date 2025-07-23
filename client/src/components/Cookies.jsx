// import { useEffect, useState } from "react";

// const CookiesConsent = () => {
//   const [showBanner, setShowBanner] = useState(false);

//   useEffect(() => {
//     const consent = localStorage.getItem("cookie_consent");
//     if (!consent) {
//       setShowBanner(true);
//     }
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem("cookie_consent", "true");
//     setShowBanner(false);
//     // Trigger any preload or performance logic here
//   };

//   if (showBanner) return null;

//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50 shadow-lg">
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm">
//           We use cookies to improve your experience and load content faster on
//           your next visit. By clicking "Accept All", you agree to our use of
//           cookies.
//         </p>
//         <button
//           onClick={handleAccept}
//           className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md"
//         >
//           Accept All
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CookiesConsent;

// src/components/CookiesConsent.js

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CookiesConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentTimestamp = localStorage.getItem("cookiesAcceptedAt");

    if (consentTimestamp) {
      const acceptedTime = new Date(parseInt(consentTimestamp, 10));
      const currentTime = new Date();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

      // Show banner if 3 days have passed
      if (currentTime - acceptedTime > threeDaysInMs) {
        setShowBanner(true);
      }
    } else {
      // No consent found
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAcceptedAt", Date.now().toString());
    toast.success("Thank you! Cookies accepted! Enjoy Fast Web Experience", {
      duration: 5000, // 5 seconds
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50 max-w-sm w-full">
      <p className="text-sm text-gray-700 mb-2">
        We use cookies 🍪 to enhance your experience. By clicking "Accept All",
        you agree to our cookie policy.
      </p>
      <button
        onClick={handleAccept}
        className="bg-[#dc143c] hover:bg-red-700 text-white px-4 py-2 text-sm rounded-md transition duration-200"
      >
        Accept All
      </button>
    </div>
  );
};

export default CookiesConsent;
