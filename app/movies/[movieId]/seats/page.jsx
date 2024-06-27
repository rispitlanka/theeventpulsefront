"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navBar";
import Link from "next/link";
import "../seats/seatstyle.css";

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatHovered, setSeatHovered] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = (section, side, rowIndex, seatIndex) => {
    const seatKey = side
      ? `${section}-${side}-${rowIndex}-${seatIndex}`
      : `${section}-${rowIndex}-${seatIndex}`;
    setSeatHovered((prev) => ({
      ...prev,
      [seatKey]: true,
    }));
  };

  const handleMouseLeave = (section, side, rowIndex, seatIndex) => {
    const seatKey = side
      ? `${section}-${side}-${rowIndex}-${seatIndex}`
      : `${section}-${rowIndex}-${seatIndex}`;
    setSeatHovered((prev) => ({
      ...prev,
      [seatKey]: false,
    }));
  };

  const seats = {
    stalls: {
      left: Array.from({ length: 14 }, (_, rowIndex) =>
        Array.from({ length: 13 }, (_, seatIndex) => ({
          number: `${seatIndex + 1}`,
          status: "available",
        }))
      ),
      right: Array.from({ length: 14 }, (_, rowIndex) =>
        Array.from({ length: 12 }, (_, seatIndex) => ({
          number: `${seatIndex + 14}`,
          status: "available",
        }))
      ),
    },
    balcony: Array.from({ length: 6 }, (_, rowIndex) =>
      Array.from({ length: 20 }, (_, seatIndex) => ({
        number: `${seatIndex + 1}`, //`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`,
        status: "available",
      }))
    ),
  };

  const handleSeatClick = (section, side, rowIndex, seatIndex) => {
    const seatKey = side
      ? `${section}-${side}-${rowIndex}-${seatIndex}`
      : `${section}-${rowIndex}-${seatIndex}`;
    setSelectedSeats((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderSeats = (section, side) => {
    return seats[section][side].map((row, rowIndex) => (
      <div className="flex justify-center" key={rowIndex}>
        {side === "left" && (
          <div className="flex items-center mr-2">
            {String.fromCharCode(65 + rowIndex)}
          </div>
        )}
        {row.map((seat, seatIndex) => {
          const seatKey = side
            ? `${section}-${side}-${rowIndex}-${seatIndex}`
            : `${section}-${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeats.includes(seatKey);
          const isHovered = seatHovered[seatKey];

          return (
            <div
              key={seatIndex}
              className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100`}
              style={{ position: "relative" }}
            >
              <svg
                width="20"
                height="23.33"
                viewBox="0 0 30 35"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() =>
                  handleSeatClick(section, side, rowIndex, seatIndex)
                }
                onMouseEnter={() =>
                  handleMouseEnter(section, side, rowIndex, seatIndex)
                }
                onMouseLeave={() =>
                  handleMouseLeave(section, side, rowIndex, seatIndex)
                }
                className="seat-icon"
              >
                <path
                  d="M3.74219 6C3.74219 2.68629 6.42848 0 9.74219 0H20.7422C24.0559 0 26.7422 2.68629 26.7422 6V24H3.74219V6Z"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                  className="seat-icon"
                  // onMouseEnter={() =>
                  //   handleMouseEnter(section, side, rowIndex, seatIndex)
                  // }
                  // onMouseLeave={() =>
                  //   handleMouseLeave(section, side, rowIndex, seatIndex)
                  // }
                />
                <rect
                  x="3.74219"
                  y="26"
                  width="23"
                  height="9"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                  className="seat-icon"
                />
                <rect
                  x="24.7422"
                  y="16"
                  width="5"
                  height="16"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                  className="seat-icon"
                />
                <rect
                  x="0.742188"
                  y="16"
                  width="5"
                  height="16"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                  className="seat-icon"
                />
              </svg>
              {(isHovered || isSelected) && (
                <span className="text-white font-semibold text-xs mb-2 absolute seat-icon">
                  {seat.number}
                </span>
              )}
            </div>
          );
        })}
        {side === "right" && (
          <div className="flex items-center ml-2">
            {String.fromCharCode(65 + rowIndex)}
          </div>
        )}
      </div>
    ));
  };

  const renderBalconySeats = () => {
    return seats.balcony.map((row, rowIndex) => (
      <div className="flex justify-center" key={rowIndex}>
        <div className="flex items-center mr-2">
          {String.fromCharCode(65 + rowIndex)}
        </div>
        {row.map((seat, seatIndex) => {
          const seatKey = `balcony-${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeats.includes(seatKey);
          const isHovered = seatHovered[seatKey];

          return (
            <div
              key={seatIndex}
              className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100`}
              style={{ position: "relative" }}
            >
              <svg
                width="20"
                height="23.33"
                viewBox="0 0 30 35"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() =>
                  handleSeatClick("balcony", null, rowIndex, seatIndex)
                }
                onMouseEnter={() =>
                  handleMouseEnter("balcony", null, rowIndex, seatIndex)
                }
                onMouseLeave={() =>
                  handleMouseLeave("balcony", null, rowIndex, seatIndex)
                }
                className="seat-icon"
              >
                <path
                  d="M3.74219 6C3.74219 2.68629 6.42848 0 9.74219 0H20.7422C24.0559 0 26.7422 2.68629 26.7422 6V24H3.74219V6Z"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                />
                <rect
                  x="3.74219"
                  y="26"
                  width="23"
                  height="9"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                />
                <rect
                  x="24.7422"
                  y="16"
                  width="5"
                  height="16"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                />
                <rect
                  x="0.742188"
                  y="16"
                  width="5"
                  height="16"
                  fill={isHovered || isSelected ? "#1CCE83" : "#CE1C1C"}
                />
              </svg>
              {(isHovered || isSelected) && (
                <span className="text-white text-xs mb-2 absolute">
                  {seat.number}
                </span>
              )}
            </div>
          );
        })}
        <div className="flex items-center ml-2">
          {String.fromCharCode(65 + rowIndex)}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar />
      <section className="pt-20 md:pt-24 px-4">
        <div className="container pb-20 mx-auto">
          <div className="flex items-baseline justify-between space-x-20 mb-4">
            <div className="">
              <button
                className="bg-white border border-gray-400 rounded-lg px-4 py-2 shadow flex items-center space-x-2"
                onClick={toggleDropdown}
              >
                <span className="font-semibold">14:40</span>
                {isDropdownOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 font-bold"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 font-bold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                )}
              </button>
              <div className="">
                {isDropdownOpen && (
                  <div className="absolute mt-2 bg-white border w-1/4 px-10 py-3 border-gray-200 rounded-lg shadow-lg">
                    <div className="grid grid-cols-4 gap-2 p-1">
                      <button className="bg-gray-300 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        07:00
                      </button>
                      <button className="bg-gray-300 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        10:00
                      </button>
                      <button className="bg-red-700 text-white py-1 px-2 font-bold text-xs rounded">
                        14:40
                      </button>
                      <button className="bg-white border border-gray-400 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        18:35
                      </button>
                      <button className="bg-white border border-gray-400 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        17:10
                      </button>
                      <button className="bg-white border border-gray-400 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        15:40
                      </button>
                      <button className="bg-white border border-gray-400 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        22:00
                      </button>
                      <button className="bg-white border border-gray-400 text-gray-700 py-2 px-0 font-bold text-xs rounded">
                        19:00
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-end">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm">Select</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                  <span className="text-sm">Sold</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full items-start mb-2">
            <svg
              width="929"
              height="66"
              viewBox="0 0 929 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.841056 62.7002C374.273 -17.0999 555.38 -13.8243 928.07 61.0082"
                stroke="#8F5555"
                stroke-width="6"
              />
            </svg>
          </div>

          <div className="mt-2 text-gray-500 text-center">Stalls seats</div>
          <div className=" mt-4 overflow-x-auto">
            <div className="flex justify-center">
              <div className="mr-8">{renderSeats("stalls", "left")}</div>
              <div className="ml-8">{renderSeats("stalls", "right")}</div>
            </div>
          </div>

          <div className="mt-8 text-gray-500 mb-5 text-center">
            Balcony Seats
          </div>
          <div className=" p-4  mt-4 overflow-x-auto">
            {renderBalconySeats()}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 shadow-md">
        <div className="flex justify-between items-center container mx-auto">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">
              Time:{" "}
              <span className="font-bold text-black">16 Jan 2024 14 :40</span>
            </span>
            <span className="text-gray-600">
              Screen:{" "}
              <span className="font-bold text-black"> Regal [SILVER 2D]</span>
            </span>
          </div>
          <Link href={`/movies/id/seats/payment`} passHref>
            <button
              className={`py-2 px-16 rounded-lg ${
                selectedSeats.length > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400"
              } text-white`}
              disabled={selectedSeats.length === 0}
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Seats;
