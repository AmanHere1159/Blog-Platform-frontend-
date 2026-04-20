import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // login
  const [open, opendata] = useState(true);
  // Signup
  const [data, setdata] = useState(false);
  // save data
  const [value, setvalue] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandleSignup = async () => {
    if (!value.username || !value.email || !value.password) {
      setErrorMessage("please enter email/password");
      return;
    }
    setErrorMessage("");
    try {
      console.log(value);
      const res = await axios.post(
        "http://localhost:5004/Blogs/Signup",
        value,
        { withCredentials: true }
      );
      const { token } = res;
      console.log(`this is token ${token}`);
      if (res) {
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandlelogin = async () => {
    if (!value.username || !value.password) {
      setErrorMessage("please enter email/password");
      return;
    }
    setErrorMessage("");
    try {
      console.log(value);
      const res = await axios.post("http://localhost:5004/Blogs/Login", value, {
        withCredentials: true,
      });
      const { token } = res;
      // console.log(`this is token ${token}`);
      if (res) {
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Wrong password");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };
  function handleClick() {
    opendata(!open);
    setdata(!data);
    setErrorMessage("");
  }
  function onInputchange(e) {
    setvalue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <div
      className="h-148 w-90 bg-white flex items-center 
    justify-center md:h-120 md:items-center md:justify-center md:m-auto 
    lg:items-center lg:justify-center lg:h-128.4 lg:m-auto"
    >
      <div
        className="h-110 w-80 color box2 flex flex-col gap-2
       justify-center items-center md:h-100 md:w-70"
      >
        <div
          className="h-10 w-70 mb-18 md:w-60
         bg-amber-300 text-3xl text-center"
        >
          BLOG
        </div>
        {errorMessage && (
          <div className="text-red-500 font-bold mb-2 text-center w-70 md:w-60">
            {errorMessage}
          </div>
        )}
        {/* input box 1 */}
        <div className=" w-70  underlineborder md:w-60">
          <input
            onChange={(e) => {
              onInputchange(e);
            }}
            name="username"
            type="text"
            placeholder="Enter Username"
            // className="h-10 m-70 md:w-60 bg-blue-700"
          />
        </div>
        {open && (
          <div className=" w-70 underlineborder md:w-60">
            <input
              onChange={(e) => {
                onInputchange(e);
              }}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
        )}
        {/* data = signup */}
        {data && (
          <div className=" w-70 underlineborder md:w-60">
            <input
              onChange={(e) => {
                onInputchange(e);
              }}
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
        )}
        {data && (
          <div className=" w-70 underlineborder md:w-60">
            <input
              onChange={(e) => {
                onInputchange(e);
              }}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
        )}

        {open && (
          <button
            className="h-10 w-70 
         md:w-60 bg-blue-700 box1"
            onClick={submitHandlelogin}
          >
            Login
          </button>
        )}
        {/* create account btn */}
        {open && (
          <button
            onClick={handleClick}
            className="h-10 w-70 md:w-60 text-black  box1"
          >
            Create an account
          </button>
        )}
        {data && (
          <div className=" h-10 w-70 md:w-60 flex flex-col box1">
            <button
              onClick={submitHandleSignup}
              className="h-0 w-70 bg-blue-700 md:w-60 box1 mt-2"
            >
              Signup
            </button>
          </div>
        )}
        {data && (
          <button
            onClick={handleClick}
            className="h-10 w-70 md:w-60 bg-blue-700 box1"
          >
            Already have an account
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
