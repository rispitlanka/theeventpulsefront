import Link from "next/link";
import React from "react";
import Navbar from "../../components/navBar";

function ForgotPassword() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow items-center justify-center bg-gray-100">
        <div className="lg:w-1/3 lg:container lg:mx-auto    max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Forget Password</h2>
          <p className="text-gray-600 mb-10">
            Having trouble signing in? Enter your email address to recover your
            password. We'll help you get back on track.
          </p>
          <form>
            <div class="mb-10 relative w-3/4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="absolute  inset-y-0 left-3 mt-1.5 w-6 h-6 text-white pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="text"
                id="username"
                placeholder="Example@gmail.com"
                class="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-3 rounded w-1/2  xl:w-1/3"
            >
              <a href="/login/forgot-password/verification">
                Verification Code
              </a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
