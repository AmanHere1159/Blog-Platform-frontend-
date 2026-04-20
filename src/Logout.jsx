import React from "react";
import Navbar from "./Navbar";
import pic5 from "../src/assets/logout.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "./config";
const Logout = () => {
  const navigate = useNavigate();
  const handleclick = async () => {
    try {
      const res = axios.get(`${BACKEND_URL}/Blogs/Logout`, {
        withCredentials: true,
      });
      if (res) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {}
  };
  return (
    <div className=" h-130 w-full relative flex flex-col items-center z-10">
      <Navbar />
      {/* 1-> image part starts*/}
      <NavLink to="/">
        <div
          onClick={handleclick}
          className="h-15 w-70  radi mt-40 bg-orange-400 flex  
                  text-3xl thiscolor justify-center cursor-pointer items-center"
        >
          Logout&nbsp;
          <img
            src={pic5}
            alt=""
            className="h-6 w-6  mt-0.5 object-cover self-center"
          />
        </div>
      </NavLink>

      {/* image part ends */}
    </div>
  );
};

export default Logout;
