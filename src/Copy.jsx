import React, { useEffect, useState } from "react";
import pic2 from "../src/assets/spi.jpg";

const Copy = () => {
  // useState for useing setting and using data
  const [data, setdata] = useState([]);
  // useEffect to fetch all data
  useEffect(() => {
    // function
    const getAllData = async () => {
      try {
        const data = await fetch("http://localhost:5004/Blogs/getAllData");
        const json = await data.json();
        console.log(json);

        setdata(json);
      } catch (error) {
        console.log(error);
      }
    };
    // function calling
    getAllData();
  }, []);
  const imageURL = "http://localhost:5004/uploads/";
  return (
    <div className="h-230 w-210 bg-amber-500 justify-center flex flex-row gap-5">
      {data.map((item, i) => (
        <div key={i} className="h-75 w-50 mt-4 bg-amber-50 items-center radi">
          {/* image div */}
          <div className="h-30 w-full radi  ">
            <img
              src={`${imageURL}${item.imgString}`}
              alt=""
              className="w-full  h-full radi object-cover"
            />
          </div>
          {/* title */}
          <div className="h-10 blogother w-full text-center b ">
          Title:  {item.Title}
          </div>
          {/* email */}
          <div className="h-10 blogother w-full text-center ">
          Auther:  {item.Email}
          </div>
          {/*Blog  */}
          <div className="h-10 w-full blogtxtsize  ">
           Blog: {item.Blog}</div>
          {/* Comment */}
          {/* <div className="h-10 w-full  bg-green-400">{item.Comment}</div> */}
        </div>
      ))}

      {/* cards 1*/}

      {/* card ends */}
    </div>
  );
};

export default Copy;
