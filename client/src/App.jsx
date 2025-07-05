import React from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Home />
    </>
  );
};

export default App;
