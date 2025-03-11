

import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footor from "../components/Footor";


export default function Home() {
    const navigate = useNavigate()
return (
    <>
    <Navbar/>
 
    <section className=" overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-20 bg-gray-100">
        {/* Left Side Content */}
        <div className="w-full ml-10 md:w-1/2 text-left ">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Welcome to the <br /> Carbon Emission Tracking App
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-4">
                A smarter way to measure, analyze, and reduce your carbon footprint.
            </p>
            
            {/* About Us Button */}
            <button onClick={()=> navigate('/solution')} className="mt-6 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold cursor-pointer">
                Getting Started
            </button>
        </div>

        {/* Right Side Image */}
        <div className=" absolute right-0 w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <svg
                className="max-w-full md:max-w-lg lg:max-w-xl"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="700"
               
            >
                {/* Clip Path Definition */}
                <defs>
                    <clipPath id="blobClip">
                        <path
                            fill="none"
                            d="M27.1,-0.6C27.1,13,13.5,25.9,-1.5,25.9C-16.6,25.9,-33.2,13,-33.2,-0.6C-33.2,-14.3,-16.6,-28.5,-1.5,-28.5C13.5,-28.5,27.1,-14.3,27.1,-0.6Z"
                            transform="translate(50 50)"
                        />
                    </clipPath>
                </defs>

                {/* Image with Clipping */}
                <image
                    className="object-cover object-center"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    href="home.png"
                    clipPath="url(#blobClip)"
                />
            </svg>
        </div>
    </section>
    <Footor/>
    </>
)
}

