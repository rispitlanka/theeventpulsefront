import Link from "next/link";
import React from "react";
import Navbar from "../components/navBar";

function LogIn() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        {/* Left section with gradient background */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-700 text-white items-center justify-center">
          <div className="text-center p-10 m-10">
            <h1 className="text-6xl font-bold mb-8 text-left ">Welcome :)</h1>
            <p className="text-lg  w-3/4 text-left ">
              Sign in & book tickets faster and save time, enjoy the show.{" "}
              {"     "}Your theater awaits
            </p>
          </div>
        </div>

        {/* Right section with login form */}
        <div className="flex flex-col lg:w-1/2 items-center justify-center bg-gray-100 p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 ">Login</h2>
            <p className="text-left text-lg  mb-6">
              Sign in for a seamless booking experience and Manage reservations
            </p>
            <form>
              <div class="mb-8 relative">
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

              <div class="mb-10 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="absolute inset-y-0 left-3 w-7 h-7 pt-1.5 text-gray-700 pointer-events-none"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters password"
                  class="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg w-full mb-4"
              >
                Login
              </button>
              <div className="text-center mb-4">
                <Link href="/login/forgot-password">
                  <p className="text-purple-500 text-right hover:text-purple-700">
                    Forgot Password?
                  </p>
                </Link>
              </div>
              <div className="flex  items-center justify-center mb-4">
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full "></span>
                <hr className="w-2/5 border-t-2 border-purple-300" />
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full "></span>
                <span className="mx-8 text-gray-500">Or</span>
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full "></span>
                <hr className="w-2/5 border-t-2 border-purple-300" />
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full "></span>
              </div>

              <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 128 128"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fill="#fff"
                    d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                  ></path>
                  <path
                    fill="#e33629"
                    d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                  ></path>
                  <path
                    fill="#f8bd00"
                    d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
                  ></path>
                  <path
                    fill="#587dbd"
                    d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
                  ></path>
                  <path
                    fill="#319f43"
                    d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
                  ></path>
                </svg>{" "}
                <span className="text-sm">Sign up with Facebook</span>
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fill="#1877f2"
                    d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  ></path>
                  <path
                    fill="#fff"
                    d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
                  ></path>
                </svg>

                {/* Use LogosFacebook component */}
                <span className="text-sm">Sign up with Facebook</span>
              </button>
            </form>
            <p className="text-center text-gray-500 mt-4">
              Not Registered Yet?{" "}
              <Link href="/register">
                <button className="text-purple-500 hover:text-purple-700">
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
