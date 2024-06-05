import Link from "next/link";
import React from "react";
import Navbar from "../../../../components/navBar";

function ResetPassword() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md lg:w-1/3 container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Reset the password</h2>
          <p className="text-gray-600 mb-8">
            Update your password to keep your account secure. Create a strong
            new password and confirm it
          </p>
          <form>
            <div className="mb-0 md:mb-6 relative w-full  md:w-4/5 mx-auto">
              <div className="mb-6 lg:mb-8 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute inset-y-0 left-3 w-7 h-7 pt-1.5 text-blue-700 pointer-events-none"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter the new password"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-0 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute inset-y-0 left-3 w-7 h-7 pt-1.5 text-blue-700 pointer-events-none"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="Re-enter the new password"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-3 mt-4 md:mt-0 rounded w-full md:w-1/2 xl:w-1/3"
            >
              <Link href="/">Change</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
