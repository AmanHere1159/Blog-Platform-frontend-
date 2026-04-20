import React, { useEffect, useState } from "react";
import pic6 from "../src/assets/Blog.jpg";
import pic7 from "../src/assets/add.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "./config";

const NewBlog = () => {
  const navigate = useNavigate();
  const [realFile, setRealFile] = useState(null);
  // message
  const [message, setMessage] = useState("");
  // email
  const [email, setEmail] = useState(null);
  // image setter
  const [bgImage, setBgImage] = useState(null);
  // audio
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [audioName, setAudioName] = useState("");
  // taking blog story
  const [story, setstory] = useState({
    Title: "",
    Blog: "",
    Email: "",
    Category: "",
  });

  function oninputStory(e) {
    setstory({ ...story, [e.target.name]: e.target.value });
    // console.log(story);
  }
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!realFile) {
      setMessage("Please select a file.");
      return;
    }
    if (!story.Title?.trim()) {
      setMessage("Please enter a title.");
      return;
    }
    if (!story.Blog?.trim()) {
      setMessage("Please enter your story.");
      return;
    }
    if (!story.Category) {
      setMessage("Please select a vlog category.");
      return;
    }
    console.log("yhhaa tak sahi h");
    console.log(`email is ${email}`)
    const formdata = new FormData();
    formdata.append("blogImage", realFile);
    formdata.append("Blog", story.Blog);
    formdata.append("Title", story.Title);
    formdata.append("Email", email);
    formdata.append("Category", story.Category);
    if (audioFile) {
      formdata.append("audioFile", audioFile);
    }
    try {
      console.log("this is formdata", formdata)
      const status = await axios.post(
        `${BACKEND_URL}/Blogs/upload`,
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log("this is status", status)
      console.log("this is status data", status.data.message)
      setMessage(status.data.message || "File uploaded successfully!");
      setTimeout(() => {
        navigate("/Home");
      }, 3000);
    } catch (error) {
      setMessage("Upload failed");
      console.error(error);
    }
  };
  useEffect(() => {
    try {
      async function getEmail() {
        const RegisteredEmail = await axios.get(`${BACKEND_URL}/Blogs/GetEmail`, {
          headers: { "Content-Type": "multipart/form-data" },
          method: "GET",
          withCredentials: true,
        })
        let gotEmail = ""
        console.log(`this is registeredEmail ${RegisteredEmail.data.email}`)
        setEmail(RegisteredEmail.data.email);
      }
      getEmail();
    } catch (error) {
      console.log(error);
    }

  }, [])

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setRealFile(file);
      setBgImage(URL.createObjectURL(file));
    }
  }

  function handleAudio(e) {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
      setAudioName(file.name);
    }
  }

  function removeAudio() {
    setAudioFile(null);
    setAudioURL(null);
    setAudioName("");
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <form onSubmit={handleUpload} className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">

        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Draft new post</h1>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all shadow hover:shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            Publish
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L11 6.414V15a1 1 0 11-2 0V6.414L5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${message.toLowerCase().includes('fail') || message.toLowerCase().includes('error') || message.toLowerCase().includes('please') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-200'}`}>
            {message.toLowerCase().includes('fail') || message.toLowerCase().includes('error') || message.toLowerCase().includes('please') ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <p className="font-medium text-sm">{message}</p>
          </div>
        )}

        {/* Cover Image Upload */}
        <label className="relative group w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden bg-gray-50 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors">
          <input
            type="file"
            onChange={handleFile}
            className="hidden"
            accept="image/*"
          />
          {bgImage ? (
            <>
              <img src={bgImage} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
              <div className="absolute z-10 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity font-medium pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Change Cover Image
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 z-10 pointer-events-none">
              <div className="p-4 bg-white rounded-full shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Click to upload a cover image</p>
            </div>
          )}
        </label>

        {/* Title Input */}
        <div>
          <input
            name="Title"
            onChange={oninputStory}
            type="text"
            placeholder="Post title here..."
            className="w-full text-center text-4xl sm:text-5xl font-extrabold text-gray-800 placeholder-gray-300 bg-transparent outline-none py-2 transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex justify-center mt-2 mb-6">
          <select
            name="Category"
            onChange={oninputStory}
            value={story.Category || ""}
            className="w-full sm:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer shadow-sm hover:border-gray-300 focus:bg-white text-center sm:text-lg"
            aria-label="Vlog Category"
          >
            <option value="" disabled>Select Vlog Category</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        {/* Story Textarea */}
        <div>
          <textarea
            name="Blog"
            onChange={oninputStory}
            spellCheck="false"
            rows="8"
            placeholder="Tell your story..."
            className="w-full text-center text-lg sm:text-xl leading-relaxed text-gray-600 placeholder-gray-400 bg-transparent outline-none resize-none min-h-[250px]"
          ></textarea>
        </div>

        {/* Audio Upload */}
        <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-3xl p-6 border border-indigo-100/50">
          <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            Attach Audio (optional)
          </p>
          <label className="flex flex-col sm:flex-row items-center gap-4 w-full cursor-pointer hover:bg-white/60 p-4 rounded-2xl transition-all border border-transparent hover:border-indigo-200">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-indigo-900 font-semibold block text-base leading-tight">
                {audioName ? audioName : "Click to select a soundtrack"}
              </span>
              <span className="text-indigo-500/80 text-sm block mt-1">
                Supports MP3, WAV, OGG, M4A
              </span>
            </div>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudio}
              className="hidden"
            />
          </label>

          {audioURL && (
            <div className="mt-4 flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
              <audio controls src={audioURL} className="w-full h-12 outline-none rounded-lg" />
              <button
                type="button"
                onClick={removeAudio}
                className="self-end text-sm text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Remove audio
              </button>
            </div>
          )}
        </div>

        {/* Removed Comment Section since the backend doesn't accept initial comments */}

      </form>
    </div>
  );
};

export default NewBlog;
