import Navbar from "@/app/components/navBar";
import Link from "next/link";
import React from "react";

function Payment() {
  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-12 px-1 min-h-screen">
        <div className="flex justify-between py-6">
          <div className="bg-gray-100   p-8 flex-1 mr-16">
            <h2 className="text-2xl font-semibold mb-6">YOUR DETAILS</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Your Phone Number
                </label>
                <div className="mt-1 flex">
                  <select
                    id="country-code"
                    className="block p-3 border border-gray-300 rounded-l-md"
                  >
                    <option value="+94">+94</option>
                    {/* Add other country codes as needed */}
                  </select>
                  <input
                    type="text"
                    id="phone"
                    className="block w-full p-3 border border-gray-300 rounded-r-md"
                    placeholder="123-456-7890"
                  />
                </div>
              </div>
            </form>
            <div className="mt-8 p-6 bg-white rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  The Ministry of Ungentlemanly Warfare
                </h3>
                <p className="text-gray-600">16 Jan 2024, 14:40</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Balcony Seats:</p>
                <p className="text-gray-600">A1 B1 C1</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Stall Seats:</p>
                <p className="text-gray-600">A1 B1 C1</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Seats Info:</p>
                <p className="text-gray-600">Full 5, Half 1</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-700">Booking Fees:</p>
                <p className="font-bold text-gray-700">250.00</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900">Total:</p>
                <p className="text-xl font-bold text-gray-900">5450.00</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href={`/movies/id/seats/payment/success`} passHref>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md">
                  PAYMENT
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/3 h-[80vh] ">
            <img
              src="/indian2.png" // Replace with the correct path to the image
              alt="Movie Poster"
              className="rounded-lg shadow-md w-full  object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
