"use client";
import Navbar from "@/app/components/navBar";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "./../../../../../supabaseClient";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
function Success() {
  const [zoneSeats, setZoneSeats] = useState({});
  const [movieData, setMovieData] = useState([]);
  const [theatreData, setTheatreData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const showTime = searchParams.get("time");
  const storedBalconySeats = searchParams.get("selectedSeats");
  const movieId = searchParams.get("movieId");
  const theatre = searchParams.get("theatre");
  const theatreId = searchParams.get("theatreId");
  const screen = searchParams.get("screen");

  useEffect(() => {
    if (storedBalconySeats) {
      const balconySeatsArray = storedBalconySeats.split(",");
      const seatsByZone = balconySeatsArray.reduce((acc, seat) => {
        const [zone, seatNumber] = seat.split("-");
        if (!acc[zone]) {
          acc[zone] = [];
        }
        acc[zone].push(seatNumber);
        return acc;
      }, {});
      setZoneSeats(seatsByZone);
    }
  }, [storedBalconySeats]);

  const groupZonesInPairs = (zones) => {
    const grouped = [];
    for (let i = 0; i < zones.length; i += 2) {
      grouped.push(zones.slice(i, i + 2));
    }
    return grouped;
  };

  const zoneEntries = Object.entries(zoneSeats);
  const groupedZones = groupZonesInPairs(zoneEntries);

  useEffect(() => {
    if (movieId) {
      fetchMovieData();
    }
  }, [movieId, zoneSeats]);

  useEffect(() => {
    if (theatreId) {
      fetchTheatreData();
    }
  }, [theatreId]);

  console.log(theatreData);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", movieId);
      if (error) throw error;
      if (data) {
        setMovieData(data[0]);
        calculateTotalPrice();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchTheatreData = async () => {
    try {
      const { data, error } = await supabase
        .from("theatres")
        .select("*")
        .eq("id", theatreId);
      if (error) throw error;
      if (data) {
        setTheatreData(data[0]);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = async () => {
    try {
      const zoneNames = Object.keys(zoneSeats); // Get the zone names from zoneSeats

      if (zoneNames.length === 0) return; // If no zones are present, return early

      // Fetch the prices for all the zones in one request
      const { data: zoneData, error: zoneError } = await supabase
        .from("zones")
        .select("name, price")
        .in("name", zoneNames); // Fetch only the zones that are present in zoneSeats

      if (zoneError) throw zoneError;

      if (!zoneData || zoneData.length === 0) {
        console.log("No data returned for zones");
        return;
      }

      // Calculate the total price
      let totalPrice = 0;

      for (const zoneName of zoneNames) {
        const zone = zoneData.find((z) => z.name === zoneName); // Find the corresponding zone in the fetched data
        if (zone) {
          const seatCount = zoneSeats[zoneName].length; // Get the count of seats for this zone
          totalPrice += seatCount * zone.price; // Calculate the total price for this zone and add it to the overall total
        }
      }

      totalPrice += 250; // Add the Rs. 250 booking fee

      setTotalPrice(totalPrice); // Set the total price in the state
      setLoading(false);
    } catch (error) {
      console.log("Error fetching zone prices:", error.message);
    }
  };

  const printRef = useRef();

  const handleDownloadPDF = async () => {
    const element = printRef.current;

    // Increase scale for better resolution
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");

    // Adjust PDF dimensions to match the content's height and width
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("download.pdf");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {loading ? ( // Show loading indicator
        <div className="flex justify-center items-center h-screen">
          <svg
            className="animate-spin h-12 w-12 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0" />
          </svg>
          <h6 className="text-4xl">Loading....</h6>
        </div>
      ) : (
        <div className="bg-gray-100 " ref={printRef}>
          <div className="container pt-20 w-full mx-auto py-4">
            {/* Booking Confirmation Message */}
            <div className="container mx-auto text-center  py-4">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-green-600"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 14.586L6.293 12.88l1.414-1.414L11 13.757l5.293-5.293l1.414 1.414Z"
                  ></path>
                </svg>
                <h2 className="text-xl font-semibold ">
                  Your booking is confirmed!
                </h2>
              </div>
            </div>
            <div className="p-6 md:flex">
              <div className="md:w-1/3 px-4">
                <img
                  src={movieData?.poster}
                  alt="Movie Poster"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg pl-3 flex flex-col md:flex-row">
                <div className="md:w-2/3 border-r-4 border-dashed  py-6 pr-8 border-gray-300 ">
                  <div className=" ">
                    <h2 className="text-2xl w-3/4   pb-4 pt-3  font-bold">
                      {movieData ? movieData.title : "Loading..."}
                    </h2>

                    <div>
                      <p className=" pb-4">
                        {" "}
                        screen:
                        <span className="font-bold">
                          {theatre} [ {screen} ]{" "}
                        </span>
                      </p>

                      <div className="flex space-x-10 justify-between">
                        <div className="pb-4 flex space-x-2.5">
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
                              {theatreData ? theatreData.address : "Loading..."}
                              {}
                            </p>
                          </div>
                        </div>
                        <div className="text-slate-700 font-bold">
                          <p className="">{date}</p>
                          <p className=""> {showTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" ">
                    {groupedZones.map((pair, index) => (
                      <div key={index} className="flex mb-3">
                        {pair.map(([zoneName, seats]) => (
                          <div key={zoneName} className="flex-1 mr-4">
                            <p className="text-gray-600 pb-1">
                              {zoneName} Seats
                            </p>
                            <p className="font-bold pb-3">
                              {seats.length > 0 ? seats.join(", ") : "--"}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                    <p className=" text-gray-600 pb-1">Person info: </p>
                    <p className=" font-bold pb-3">3 Adult, 1 Child</p>
                    <p className=" text-gray-600 pb-1"> Booking Fees 250.00 </p>
                    <div className="flex justify-between">
                      <p className=" font-bold pb-4"> Total </p>
                      <p className=" font-bold pb-4"> Rs.{totalPrice} </p>
                    </div>
                  </div>
                </div>

                <div className="justify-start">
                  <div className="h-14 w-14 -m-7 bg-gray-100  rounded-full"></div>
                </div>
                <div className="h-14 w-14 -m-7 bg-gray-100 rounded-full self-end mt-10"></div>

                <div className="md:w-1/3 mt-6   md:mt-0 flex flex-col  justify-start items-center">
                  <div>
                    <h2 className="text-2xl pt-9 pb-6 text-center font-bold">
                      My ticket
                    </h2>
                  </div>
                  <div className="mb-8 ">
                    <img
                      src="/qr.png"
                      alt="QR Code"
                      className="w-40 h-40 object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className=" px-10 mb-7">
                      You can start enjoying the movie by scanning your ticket
                      to the theater and canteen staff.
                    </p>
                  </div>
                  <button
                    className=" border   mx-auto flex border-black  px-6 py-2 rounded-lg"
                    onClick={handleDownloadPDF}
                  >
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
      )}
    </div>
  );
}

export default Success;
