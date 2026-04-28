import React from 'react'
import Navbar from './Navbar'
import pic3 from "../src/assets/about.jpg";

const About = () => {
  return (
    <div className=" h-130 w-full relative flex flex-col  z-10">
      <Navbar/>
       {/* 1-> image part starts*/}
          
            <div
              className="h-70 w-full  flex flex-col 
            text-3xl text-amber-50 justify-center items-center"
            >
              <img
                src={pic3}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
      
            {/* image part ends */}
      <div className='h-70 w-full bg-amber-50'>
        <h1 className='text-4xl'>Blog</h1>
        <p className='text-1xl'>Hii....!! in this project users can write there Blogs,express what they expriencied and upload a pic of that Blog</p>
      </div>
    </div>
  )
}

export default About
