import React from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import MyBookingsPage from "./pages/MyBookingPages";
import RoomDetails from "./pages/RoomDetails";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Home />
      <AllRooms />
      <MyBookingsPage />
      <RoomDetails />
    </>
  );
};

export default App;
