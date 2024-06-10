import React from "react";
import img from "../../../../public/assets/images/indian2.png";
import Image from "next/image";
import Navbar from "@/app/components/navBar";

function Seats() {
  return (
    <div className="relative bg-gray-100">
      <Navbar />
      <section className="pt-20 md:pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex items-baseline justify-between space-x-20">
            <div className="relative mb-6">
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
              <div className="flex space-x-4 mb-4">
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
          <div className="mt-2 text-gray-500 text-center justify-center">
            Stalls seats
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">
            Yours Reservations
          </h2>

          <div
            className="flex container mx-auto justify-center  items-center py-8 bg-gray-100 mb-10 "
            style={{ maxHeight: "50vh", overflowY: "auto" }}
          >
            <div className="bg-white rounded-lg shadow-lg w-9/12">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-shrink-0 w-1/2">
                  <Image
                    src={img}
                    alt="Movie Poster"
                    className="rounded-lg "
                    style={{ objectFit: "cover" }}
                    width={300}
                    height={150}
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-white p-2 max-h-48 max-w-sm w-full">
                    <h2 className="text-right text-sm font-semibold text-gray-700 mb-4">
                      Regal-silver 2D
                    </h2>

                    <div className="bg-gray-100 rounded-md p-2 mb-4">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Stall Seats</p>
                        <p className="text-gray-600">900.00</p>
                      </div>
                      <p className="font-bold">A1 B1 C1</p>
                    </div>

                    <div className="bg-gray-100 rounded-md p-2 mb-4">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Balcony Seats</p>
                        <p className="text-gray-600">1000.00</p>
                      </div>
                      <p className="font-bold">A1 B1 C1</p>
                    </div>

                    <div className="bg-gray-100 rounded-md p-2 mb-4">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Person info</p>
                        <p className="text-gray-600">Child 400</p>
                      </div>
                      <p className="font-bold">5 Adult, 1 Child</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Booking Fees</p>
                        <p className="text-gray-600">250.00</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                      <p className="text-lg font-semibold">Total</p>
                      <p className="text-lg font-semibold">5450.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-9/12 mx-auto justify-end mt-2">
            <div className="flex justify-between w-1/3">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-4">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Seats;
