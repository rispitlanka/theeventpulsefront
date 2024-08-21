"use client";
import Head from "next/head";
import Theaters from "../components/theaters";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/navBar";
import Link from "next/link";

export default function Home() {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const { data, error } = await supabase
      .from("theatres").select("*");

      if (error) throw error;

      if (data) {
        setTheatres(data);
        // setIsLoading(false);
        console.log(theatres);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeCity(city) {
    if (typeof city !== "string") return "";
    return city.toUpperCase();
  }
  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="bg-gray-100 pt-10 mt-10 p-4">
        <div className="container mx-auto flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Your Theater"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select className="p-2 border border-gray-300 rounded-md">
            <option>Select Your City</option>
            <option>City 1</option>
            <option>City 2</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      <div className="container bg-gray-100 mx-auto px-5 my-8">
        <h2 className="text-2xl font-bold mb-6">Select Your Theaters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {theatres.map((theater) => (
            <Link
              key={theater.id}
              href={`/our_theatres/${theater.id}`}
              passHref
            >
              <div className="bg-white shadow-md rounded-md overflow-hidden">
                <img
                  src={theater.theatreImage}
                  alt={theater.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{theater.name}</h3>
                  <p className="text-gray-600">{theater.description}</p>
                  <div className="flex items-center space-x-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 32 32"
                      className="w-6 h-6 text-blue-600"
                    >
                      <path
                        fill="currentColor"
                        d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                      ></path>
                      <path
                        fill="currentColor"
                        d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                      ></path>
                    </svg>
                    <p className="text-gray-700 text-md">
                      {capitalizeCity(theater.city)}
                    </p>
                  </div>
                  {/* <button
                  className={`mt-4 px-4 py-2 rounded-md ${
                    theater.isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {theater.isActive ? "ACTIVE" : "INACTIVE"}
                </button> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 text-white p-10 my-8 flex container mx-auto items-center px-5 justify-between rounded-xl shadow-lg relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/promo2.png"
            alt="Theater"
            className="w-full h-full  object-cover opacity-60 rounded-lg"
          />
        </div>

        {/* Left Section */}
        <div className="relative z-10 ml-10 space-y-4">
          <h3 className="text-purple-300 text-lg">Magestic</h3>
          <h2 className="text-4xl font-bold">Buy one get one Free</h2>
          <p className="text-sm mt-2">Until 05th May 2025</p>
          <div className="flex items-center space-x-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-red-500"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <circle cx={12} cy={10} r={3}></circle>
                <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8"></path>
              </g>
            </svg>
            <p>JAFFNA ROAD...</p>
          </div>
          <button className="mt-4 bg-purple-600 px-6 py-3 rounded-md text-lg font-semibold">
            Book Now
          </button>
        </div>

        {/* Right Section */}
        <div className="relative z-10 mr-10">
          <img
            src="/promo1.png"
            alt="Promo"
            className="w-64 h-auto rounded-lg"
          />
        </div>
      </div>

      <Theaters />
      <Footer />
    </div>
  );
}
