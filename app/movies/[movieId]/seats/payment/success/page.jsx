import Navbar from "@/app/components/navBar";
import React from "react";

function Success() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="bg-gray-100 pt-5">
        <div className="container pt-20 w-full mx-auto py-4">
          <div className="p-6 md:flex">
            <div className="md:w-1/3 px-4">
              <img
                src="/indian2.png" // Update the path to your movie poster image
                alt="Movie Poster"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg px-6 flex flex-col md:flex-row">
              <div className="md:w-2/3 border-r border-dashed py-6 pr-8 border-gray-400 ">
                <div className=" ">
                  <h2 className="text-2xl w-3/4   pb-4 pt-3  font-bold">
                    The Ministry of Ungentlemanly Warfare
                  </h2>

                  <div>
                    <p className=" pb-4">
                      {" "}
                      screen:
                      <span className="font-bold">Regal [ SILVER 2D ]</span>
                    </p>

                    <div className="flex space-x-10 justify-between">
                      <div className="pb-4 flex space-x-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="h-6 w-6 "
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              color="#CE1C1C"
                            >
                              <path d="M7 18c-1.829.412-3 1.044-3 1.754C4 20.994 7.582 22 12 22s8-1.006 8-2.246c0-.71-1.171-1.342-3-1.754m-2.5-9a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"></path>
                              <path d="M13.257 17.494a1.813 1.813 0 0 1-2.514 0c-3.089-2.993-7.228-6.336-5.21-11.19C6.626 3.679 9.246 2 12 2s5.375 1.68 6.467 4.304c2.016 4.847-2.113 8.207-5.21 11.19"></path>
                            </g>
                          </svg>
                        </div>
                        <div>
                          <p className="mr-6 pr-4">
                            3rd floor, Cargills square,
                          </p>
                          <p className="mr-6 pr-4">Hospital road, Sri Lanka</p>
                        </div>
                      </div>
                      <div className="text-slate-700 font-bold">
                        <p className="">16 Jan 2024</p>
                        <p className=""> 14:40</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ">
                  <p className=" text-gray-600 pb-2">Stall Seats</p>
                  <p className=" font-bold pb-4">A1 B1 C1</p>
                  <p className=" text-gray-600 pb-2"> Balcony Seats</p>
                  <p className=" font-bold pb-4">A1 B1 C1</p>
                  <p className=" text-gray-600 pb-2">Person info: </p>
                  <p className=" font-bold pb-4">3 Adult, 1 Child</p>
                  <p className=" text-gray-600 pb-2"> Booking Fees 250.00 </p>
                  <div className="flex justify-between">
                    <p className=" font-bold pb-4"> Total </p>
                    <p className=" font-bold pb-4"> 3000.00 </p>
                  </div>
                </div>
              </div>

              <div className="justify-start">
                <div className="h-14 w-14 -m-7 bg-gray-100  rounded-full"></div>
              </div>
              <div className="h-14 w-14 -m-7 bg-gray-100 rounded-full self-end mt-10"></div>
              <div className="md:w-1/3 mt-6  px-6 md:mt-0 flex flex-col  justify-start items-center">
                <div>
                  <h2 className="text-2xl  pb-6 text-center font-bold">
                    My ticket
                  </h2>
                </div>
                <div className="mb-8 ">
                  <img
                    src="/qr.png" // Update the path to your QR code image
                    alt="QR Code"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-600  px-4 mb-8">
                    You can start enjoying the movie by scanning your ticket to
                    the theater and canteen staff.
                  </p>
                </div>
                <button className="mt-6 border   mx-auto flex border-black  px-6 py-2 rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 mr-2 "
                    >
                      <path
                        fill="currentColor"
                        d="m12 15.577l-3.539-3.538l.708-.72L11.5 13.65V5h1v8.65l2.33-2.33l.709.719zM5 19v-4.038h1V18h12v-3.038h1V19z"
                        color="#E91B1B"
                      ></path>
                    </svg>
                  </span>{" "}
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
