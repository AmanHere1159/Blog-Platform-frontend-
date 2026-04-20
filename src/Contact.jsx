import React from 'react'
import Navbar from './Navbar'
import pic4 from "../src/assets/contact.jpg";

const Contact = () => {
  return (
<div className=" h-130 w-full relative flex flex-col  z-10">
      <Navbar/>
       {/* 1-> image part starts*/}
          
            <div
              className="h-70 w-full  bg-orange-400 flex flex-col 
            text-3xl text-amber-50 justify-center items-center"
            >
              <img
                src={pic4}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
      
            {/* image part ends */}
      <div className='h-70 w-full bg-amber-50'>
        <h1 className='text-3xl'>Contact :</h1>
        <div>
            📧 Email:
            <a
              href="mailto:sakrwt4@gmail.com"
              target="blank"
              className="colorchange"
            >
              {" "}
              amnrwt4@gmail.com
            </a>
          </div>
          <div>
            📞 Phone:{" "}
            <a href="" className="colorchange">
              {" "}
              +91 7247887624
            </a>
          </div>
          <div>
            🌐 Location:{" "}
            <a
              href="https://maps.app.goo.gl/AZw8iBfqpm2yaWDo7 "
              target="blank"
              className="colorchange"
            >
              {" "}
              Kotdwara,Pauri Garhwal,Uttarakhand, India
            </a>
          </div>
          <div>
            💼 LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/aman-rawat-414436377"
              target="blank"
              className="colorchange"
            >
              {" "}
              https://www.linkedin.com/in/aman-rawat-414436377
            </a>
          </div>
          <div>
            💻 GitHub:{" "}
            <a
              href="https://github.com/AmanHere1159/CodersCoffee"
              target="blank"
              className="colorchange"
            >
              {" "}
              https://github.com/AmanHere1159/CodersCoffee
            </a>
          </div>
      </div>
    </div>
  )
}

export default Contact
