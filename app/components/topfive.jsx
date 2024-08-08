"use client";

import { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient";
import React from "react";
import Image from "next/image";

export const TopFive = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("movies") // Replace 'movies' with your actual table name
      .select("*")
      .limit(5);
    console.log(data);

    if (error) console.error("Error fetching data:", error);
    setTopMovies(data);

    setIsLoading(false);
  };

  return (
    <div className=" items-start md:items-center justify-center bg-white p-4 pt-10 pb-20 m-10 px-0 md:px-10">
      <h1 className=" text-lg md:text-4xl font-bold mb-0 md:mb-10">
        Top 5 of the Week
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"> loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-3  md:grid-cols-5 gap-4">
          {topMovies.map((movie, index) => (
            <div key={index} className="relative mr-5">
              <div className="hidden md:block">
                <div className="relative bg-white  rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 text-3xl font-bold bg-black bg-opacity-50 text-white text-center px-4 p-2">
                    {movie.title}
                  </div>
                </div>
                <div
                  className="absolute bottom-0 -m-10 -left-2 text-gray-100 text-5xl md:text-9xl font-extrabold p-4"
                  style={{
                    textShadow:
                      "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                  }}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
          <div className="flex md:hidden">
            <div className="w-2/3 bg-gray-700 h-20"></div>
            <div className="w-2/3 bg-gray-700 h-20"></div>
            <div className="w-2/3 bg-gray-700 h-20"></div>
          </div>
        </div>
      )}
    </div>
  );
};
