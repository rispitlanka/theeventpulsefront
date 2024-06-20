"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navBar";
import Link from "next/link";

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = {
    stalls: {
      left: Array.from({ length: 14 }, (_, rowIndex) =>
        Array.from({ length: 13 }, (_, seatIndex) => ({
          number: `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`,
          status: "available",
        }))
      ),
      right: Array.from({ length: 14 }, (_, rowIndex) =>
        Array.from({ length: 12 }, (_, seatIndex) => ({
          number: `${String.fromCharCode(65 + rowIndex)}${seatIndex + 14}`,
          status: "available",
        }))
      ),
    },
    balcony: Array.from({ length: 6 }, (_, rowIndex) =>
      Array.from({ length: 20 }, (_, seatIndex) => ({
        number: `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`,
        status: "available",
      }))
    ),
  };

  const handleSeatClick = (section, side, row, seat) => {
    const seatKey = side
      ? `${section}-${side}-${row}-${seat}`
      : `${section}-${row}-${seat}`;
    setSelectedSeats((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
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
          const seatKey = `${section}-${side}-${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeats.includes(seatKey);
          return (
            <div
              key={seatIndex}
              className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer ${
                isSelected ? "bg-green-500" : "bg-white"
              }`}
              onClick={() =>
                handleSeatClick(section, side, rowIndex, seatIndex)
              }
              style={{ position: "relative" }}
            >
              <Image src="/Seat.png" alt="seat" width={20} height={20} />
              {isSelected && (
                <span className="text-white text-xs absolute">
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
          return (
            <div
              key={seatIndex}
              className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer ${
                isSelected ? "bg-green-500" : "bg-white"
              }`}
              onClick={() =>
                handleSeatClick("balcony", null, rowIndex, seatIndex)
              }
              style={{ position: "relative" }}
            >
              <Image src="/Seats.svg" alt="seat" width={20} height={20} />
              {isSelected && (
                <span className="text-white text-xs absolute">
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
            <div className="relative">
              <button className="bg-white border border-gray-400 rounded-lg px-4 py-2 shadow flex items-center space-x-2">
                <span>14:40</span>
                <svg
                  className="w-4 h-4"
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
              </button>
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
              viewBox="0 0 500 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-20"
            >
              <path
                d="M10 80 Q 250 20, 490 80"
                stroke="#8B4A46"
                strokeWidth="3"
                fill="transparent"
              />
            </svg>
          </div>

          <div className="mt-2 text-gray-500 text-center">Stalls seats</div>
          <div className=" px-4 mt-4 overflow-x-auto">
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
