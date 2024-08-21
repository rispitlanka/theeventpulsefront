"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import theater from "../../public/assets/images/raja_theater.png";
import { supabase } from "../supabaseClient";

const Theaters = () => {
  const [theatres, setTheatres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTheatres = async () => {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("theatres") // Replace 'movies' with your actual table name
        .select("*");

      console.log(data);

      if (error) console.error("Error fetching data:", error);
      setTheatres(data);

      setIsLoading(false);
    };

    fetchTheatres();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white py-12 px-4 md:px-8">
      <div className="text-center md:text-left pl-5 md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">
          Are you a theater Owner? Join with us
        </h2>
        <p className="text-lg mb-6">
          Increase your theater sales to 110% by joining with us
        </p>
        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700">
          Join with us.
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-end relative">
        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <div className="flex space-x-4 overflow-hidden">
          {theatres.slice(0, 3).map((theatre) => (
            <div key={theatre.id} className="relative w-64 h-64 flex-shrink-0 ">
              <Image
                src={theatre.theatreImage}
                alt={theatre.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-left rounded-b-lg">
                <p className="font-semibold">{theatre.name}</p>
                <p className="text-gray-300">{theatre.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theaters;
