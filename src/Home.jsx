import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import sumurai from "../src/assets/sumurai.jpg";
import downSumarai from "../src/assets/down-sumarai.jpg";
import cloud from "../src/assets/cloud.jpg";
import pic1 from "../src/assets/pic1.jpg";

const bannerImages = [sumurai, downSumarai, cloud, pic1];
const bannerPositions = ["object-right", "object-center", "object-center", "object-right"];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayName, setDisplayName] = useState("Guest");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const [data, setdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let url = "http://localhost:5004/Blogs/getAllData";
        if (selectedCategory && selectedCategory !== "All Categories") {
           url = `http://localhost:5004/Blogs/getByCategory/${selectedCategory}`;
        }
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        // Since getByCategory returns { success: true, data }, unpack it if strictly in that format!
        if (json.success !== undefined) {
           setdata(json.data || []);
        } else {
           // fallback for getAllData
           setdata(Array.isArray(json) ? json : []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, [selectedCategory]);

  useEffect(() => {
    const getCurrentUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5004/Blogs/getEmail", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const json = await response.json();
          if (json.name) {
            setDisplayName(json.name);
          }
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };
    getCurrentUserInfo();
  }, []);

  const imageURL = "http://localhost:5004/uploads/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src={bannerImages[currentImageIndex]}
                alt="Blog Cover Hero"
                className={`absolute w-[40vh] sm:w-[50vh] min-w-[300px] origin-center -rotate-90 ${bannerPositions[currentImageIndex]}`}
                style={{ height: '100vw', objectFit: 'cover' }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className="relative p-1 focus:outline-none"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
              {currentImageIndex === idx && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 w-2.5 h-2.5 m-1 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative z-20 text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-4 drop-shadow-xl">
            THE BLOG
          </h1>
          <div className="inline-block px-8 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <p className="text-white font-medium text-sm sm:text-base tracking-widest uppercase">{displayName}</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8 lg:gap-12">

        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-8">
          {/* Create Post Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Got a story?</h3>
            <p className="text-sm text-gray-500 mb-5">Share your thoughts and ideas with the world.</p>
            <NavLink
              to="/NewBlog"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Create Post
            </NavLink>
          </div>

          {/* Categories Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 ml-2">Categories</h3>
            <div className="flex flex-col gap-1">
              {["All Categories", "Music", "Movies", "Sports", "Tech", "Fashion"].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Blog Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {data.length > 0 ? data.map((item, i) => (
              <NavLink
                to={`/BlogDisplay/${item._id}`}
                state={{ i }}
                key={i}
                className="group flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={`${imageURL}${item.imgString}`}
                    alt={item.Title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                      Read
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-6 flex-1">
                  <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {item.Email}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {item.Title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {item.Blog}
                  </p>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                    <span className="text-indigo-600 text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read article <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </NavLink>
            )) : (
              <div className="col-span-full py-24 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">No stories yet</h3>
                <p className="text-gray-500 mt-2 max-w-xs">Be the first to create an amazing blog post and share it with the world!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="mt-auto bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
            {/* Branding Column */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h2 className="text-3xl font-black tracking-widest text-white uppercase">THE BLOG</h2>
              <p className="text-gray-400 text-sm font-medium max-w-xs text-center md:text-left leading-relaxed">
                A hub of curated stories, thoughts, and ideas where creators share their vision.
              </p>
            </div>

            {/* Social Links Column */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Connect</h3>
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/amanrawat1159?igsh=MW1vMDg4eWhwbXV1ZQ==" target="_blank" rel="noreferrer" title="Instagram" className="p-3 bg-gray-800/80 rounded-2xl hover:bg-pink-600 hover:-translate-y-1.5 transition-all duration-300 text-gray-400 hover:text-white shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/aman.rawat.614693" target="_blank" rel="noreferrer" title="Facebook" className="p-3 bg-gray-800/80 rounded-2xl hover:bg-blue-600 hover:-translate-y-1.5 transition-all duration-300 text-gray-400 hover:text-white shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a href="https://x.com/AmanRawat170983" target="_blank" rel="noreferrer" title="X (Twitter)" className="p-3 bg-gray-800/80 rounded-2xl hover:bg-black hover:-translate-y-1.5 transition-all duration-300 text-gray-400 hover:text-white shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.042 4.126H5.078z" />
                  </svg>
                </a>

                {/* Portfolio */}
                <a href="https://portfolio-six-zeta-1qt1mx7znf.vercel.app/" target="_blank" rel="noreferrer" title="Portfolio" className="p-3 bg-gray-800/80 rounded-2xl hover:bg-indigo-500 hover:-translate-y-1.5 transition-all duration-300 text-gray-400 hover:text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs gap-4">
            <p>&copy; {new Date().getFullYear()} Aman Rawat. All rights reserved.</p>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
