import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-14 
    fixed z-50
    addingweight flex justify-center items-center ">
      {/* HEADER */}

      {/* DESKTOP NAVBAR */}
      <div
        className="h-14 text-black w-full items-center pb-2.5 bg-amber-50 hidden pl-14 flex-row justify-center gap-10
             md:flex "
      >
        <div className="mt-auto bluecolor underlineborder">
            <NavLink to="/Home">Home</NavLink>
         
            </div>
        <div className="mt-auto bluecolor underlineborder">
            <NavLink to="/About">About</NavLink>
           </div>
        <div className="mt-auto bluecolor underlineborder">
            <NavLink to="/Contact">Contact</NavLink>
            </div>
        <div className="mt-auto bluecolor underlineborder">
            <NavLink to="/Logout">Logout</NavLink>
            </div>
      </div>
    </div>
  );
};

export default Navbar;
