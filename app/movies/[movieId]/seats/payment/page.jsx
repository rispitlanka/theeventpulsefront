"use client";
import Navbar from "@/app/components/navBar";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

function Payment() {
  const [stallSeats, setStallSeats] = useState("");
  const [balconySeats, setBalconySeats] = useState("");

  // useEffect(() => {
  //   const storedStallSeats = localStorage.getItem("selectedStallSeats");
  //   const storedBalconySeats = localStorage.getItem("selectedBalconySeats");

  //   if (storedStallSeats) {
  //     const stallSeatsArray = JSON.parse(storedStallSeats);
  //     setStallSeats(stallSeatsArray.join(" "));
  //   }
  //   if (storedBalconySeats) {
  //     const balconySeatsArray = JSON.parse(storedBalconySeats);
  //     setBalconySeats(balconySeatsArray.join(" "));
  //   }
  // }, []);

  useEffect(() => {
    const storedStallSeats = sessionStorage.getItem("selectedStallSeats");
    const storedBalconySeats = sessionStorage.getItem("selectedBalconySeats");

    if (storedStallSeats) {
      const stallSeatsArray = JSON.parse(storedStallSeats).map((seat) => {
        const seatNameMatch = seat.match(/[A-Z]+\d+/);
        return seatNameMatch ? seatNameMatch[0] : seat;
      });
      setStallSeats(stallSeatsArray.join(" "));
    }
    if (storedBalconySeats) {
      const balconySeatsArray = JSON.parse(storedBalconySeats).map((seat) => {
        const seatNameMatch = seat.match(/[A-Z]+\d+/);
        return seatNameMatch ? seatNameMatch[0] : seat;
      });
      setBalconySeats(balconySeatsArray.join(" "));
    }
  }, []);

  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-12 px-1 md:min-h-screen">
        <div className="flex justify-between py-6">
          <div className="bg-gray-100 p-8  md:w-2/3   mr-0 md:mr-16">
            <h2 className="text-2xl font-semibold mb-6">YOUR DETAILS</h2>
            <form className="space-y-6">
              <div className="relative">
                <div className="relative mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="absolute inset-y-0 left-3  w-6 h-6 mt-3 text-black pointer-events-none"
                  >
                    <path
                      fill="currentColor"
                      d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                    ></path>
                  </svg>

                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full p-3 pl-12 border border-gray-300 rounded-md"
                    placeholder="Enter your Email Address*"
                  />
                </div>
              </div>
              <div>
                <div className="mt-1 flex">
                  <select
                    id="country-code"
                    className="block p-3 border border-gray-300 rounded-l-md"
                  >
                    <option value="+94">+94</option>
                  </select>
                  <div className="relative w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="absolute inset-y-0 left-3 mt-3 w-6 h-6 text-black pointer-events-none"
                    >
                      <g fill="none">
                        <path
                          fill="currentColor"
                          d="M19 17v4c-2.758 0-5.07-.495-7-1.325c-3.841-1.652-6.176-4.63-7.5-7.675C3.4 9.472 3 6.898 3 5h4l1 4l-3.5 3c1.324 3.045 3.659 6.023 7.5 7.675L15 16z"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19.675c1.93.83 4.242 1.325 7 1.325v-4l-4-1zm0 0C8.159 18.023 5.824 15.045 4.5 12m0 0C3.4 9.472 3 6.898 3 5h4l1 4zM14 4h.01M17 4h.01M20 4h.01M14 7h.01M17 7h.01M20 7h.01M14 10h.01M17 10h.01M20 10h.01"
                        ></path>
                      </g>
                    </svg>

                    <input
                      type="text"
                      id="phone"
                      className="block w-full p-3 pl-12 border border-gray-300 rounded-r-md"
                      placeholder="Enter Your Phone Number*"
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-8 p-6 bg-white rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold w-1/2">
                  The Ministry of Ungentlemanly Warfare
                </h3>
                <div>
                  <p className="text-gray-600 text-right">Time</p>
                  <p className="text-sm font-semibold">16 Jan 2024, 14:40</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-1/2 mb-4">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 mb-1 text-black"
                  >
                    <path
                      fill="currentColor"
                      d="M5 9.15V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2.16c-1.16.41-2 1.51-2 2.81V14H7v-2.04c0-1.29-.84-2.4-2-2.81M20 10c-1.1 0-2 .9-2 2v3H6v-3a2 2 0 1 0-4 0v5c0 1.1.9 2 2 2v2h2v-2h12v2h2v-2c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2"
                    ></path>
                  </svg>
                  <div>
                    <p className="text-gray-600 text-center  ">Balcony Seats</p>
                    <p className="text-sm font-semibold px-8">
                      {" "}
                      {balconySeats ? balconySeats : "--"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-center  ">Stall Seats</p>
                  <p className="text-sm font-semibold px-8">
                    {" "}
                    {stallSeats ? stallSeats : "--"}
                  </p>
                </div>
              </div>

              <div className=" items-center mb-4">
                <p className="text-gray-600">Seats Info</p>
                <p className="font-bold">Full 5, Half 1</p>
              </div>
              <div className=" items-center mb-2">
                <p className=" text-gray-600">Booking Fees:250.00</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total:</p>
                <p className="text-xl font-bold text-gray-900">5450.00</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href={`/movies/id/seats/payment/success`} passHref>
                <button className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 rounded-md">
                  PAYMENT
                </button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:w-1/3 md:h-[80vh] ">
            <img
              src="/indian2.png"
              alt="Movie Poster"
              className="rounded-lg  w-full mt-6  object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
