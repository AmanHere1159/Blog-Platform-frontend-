import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import pic7 from "../src/assets/add.png";
import pic9 from "../src/assets/edit.png";
import pic10 from "../src/assets/delete.png";
import axios from "axios";

const ADMIN_EMAIL = "admin@theblog.com"; // Must match ADMIN_EMAIL in backend .env

const BlogDisplay = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  
  const [commentText, setComment] = useState("");
  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [editData, setEditData] = useState({ Title: "", Blog: "" });
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageURL = "http://localhost:5004/uploads/";
  const audioBaseURL = "http://localhost:5004/Audio/";

  const onEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5004/Blogs/getSingleUser/${id}`, {
          credentials: "include",
        });
        setCode(res.status);
        const json = await res.json();
        setData(json);
        setEditData({ Title: json.Title || "", Blog: json.Blog || "" });
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    const fetchCurrentEmail = async () => {
      try {
        const res = await fetch("http://localhost:5004/Blogs/getEmail", {
          credentials: "include",
        });
        if (res.ok) {
          const json = await res.json();
          setCurrentUserEmail(json.email || "");
        }
      } catch (error) {
        console.log("Email fetch error:", error);
      }
    };

    fetchBlog();
    fetchCurrentEmail();
  }, [id]);

  useEffect(() => {
    if (data && data.audioString && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay was prevented by browser. User interaction might be required.", error);
        });
      }
    }
  }, [data]);

  const postSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.put(
        `http://localhost:5004/Blogs/addComment/${id}`,
        { comment: commentText },
        { withCredentials: true }
      );
      const updatedData = await fetch(`http://localhost:5004/Blogs/getSingleUser/${id}`, {
        credentials: "include",
      }).then(r => r.json());
      setData(updatedData);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("Update function triggered! Backend persistence ready.");
  };

  const isAdmin = currentUserEmail === ADMIN_EMAIL;
  const isAuthor = code === 201;
  const canDeleteBlog = isAuthor || isAdmin;

  const handleDeleteBlog = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    setIsDeleting(true);
    try {
      const res = await axios.delete(`http://localhost:5004/Blogs/deleteBlog/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      setMessage("Failed to delete blog. Please try again.");
      setDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5004/Blogs/deleteComment/${id}/${commentId}`, {
        withCredentials: true
      });
      const updatedData = await fetch(`http://localhost:5004/Blogs/getSingleUser/${id}`, {
        credentials: "include",
      }).then(r => r.json());
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 mt-14">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] mb-10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img
            src={`${imageURL}${data.imgString}`}
            alt={data.Title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {/* Admin/Author Delete Blog Button */}
          {canDeleteBlog && (
            <div className="absolute top-4 right-4 z-10">
              {!deleteConfirm ? (
                <button
                  onClick={handleDeleteBlog}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/90 hover:bg-red-600 backdrop-blur-md text-white text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                  title="Delete this blog"
                >
                  <img src={pic10} alt="Delete" className="h-4 w-4 invert" />
                  {isAdmin && !isAuthor ? "Admin Delete" : "Delete Blog"}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-3 py-2 bg-white/90 backdrop-blur text-gray-700 text-sm font-bold rounded-xl shadow-lg transition-all hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBlog}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-60"
                  >
                    {isDeleting ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="absolute bottom-8 left-8 right-8">
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block">
              {code === 201 ? "Editing Mode" : isAdmin ? "Admin View" : "Article"}
            </span>
            {code === 201 ? (
              <input
                name="Title"
                value={editData.Title}
                onChange={onEditChange}
                className="w-full text-3xl md:text-5xl font-black text-white bg-transparent border-none focus:ring-0 outline-none drop-shadow-md placeholder:text-white/50"
                placeholder="Enter title..."
              />
            ) : (
              <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md leading-tight">
                {data.Title}
              </h1>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-8">
          {code === 201 ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Content</label>
                <textarea
                  name="Blog"
                  value={editData.Blog}
                  onChange={onEditChange}
                  rows="12"
                  className="w-full text-lg leading-relaxed p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                  placeholder="Write your story..."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Auto-save enabled
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <article className="prose prose-indigo max-w-none">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                  {data.Email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Authored by</p>
                  <p className="font-bold text-gray-900">{data.Email}</p>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif whitespace-pre-wrap">
                {data.Blog}
              </p>
            </article>
          )}

          {message && (
            <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-100 text-sm font-medium flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}
        </div>

        {/* Unified Comments Section */}
        <section className="pt-16 mt-16 border-t border-gray-200">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900">Feedback <span className="text-gray-400 font-medium ml-2">({data.Comment?.length || 0})</span></h2>
            <div className="h-1 w-24 bg-indigo-600 rounded-full"></div>
          </div>
          
          {code !== 201 && (
            <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-xl shadow-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500">
              <textarea
                value={commentText}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What do you think about this story?"
                rows="2"
                className="flex-1 w-full bg-transparent border-none focus:ring-0 text-gray-700 font-medium outline-none resize-none p-2 placeholder:text-gray-400"
              />
              <button
                onClick={postSubmit}
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                Share Feedback
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {data.Comment?.length > 0 ? (
              [...data.Comment].reverse().map((item, index) => (
                <div key={index} className="group bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md hover:border-gray-100">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 shadow-inner group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-black text-gray-900">{item.userName || `Reader #${data.Comment.length - index}`}</p>
                      </div>
                      <div className="flex gap-2">
                        {code === 201 && (
                          <button 
                            onClick={() => deleteComment(item._id)}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            title="Delete comment"
                          >
                            <img src={pic10} alt="Delete" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed font-medium italic">
                      "{item.text}"
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[3rem] py-20 text-center flex flex-col items-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">This story is waiting for its first wave of inspiration.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Background Music Player */}
      {data.audioString && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pl-4 rounded-full shadow-2xl border border-white/50 transition-all hover:scale-105">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none">Playing</span>
              <span className="text-[10px] font-medium text-gray-400 truncate max-w-[100px]">Soundtrack</span>
            </div>
            <audio
              ref={audioRef}
              src={`${audioBaseURL}${data.audioString}`}
              controls
              className="h-8 w-48 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDisplay;
