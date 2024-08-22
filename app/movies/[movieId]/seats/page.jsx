"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navBar";
import Link from "next/link";
import "../seats/seatstyle.css";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "./../../../supabaseClient";

const Seats = () => {
  const [formattedTime, setFormattedTime] = useState("");
  const [selectedStallSeats, setSelectedStallSeats] = useState([]);
  const [selectedBalconySeats, setSelectedBalconySeats] = useState([]);
  const [seatHovered, setSeatHovered] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zonesData, setZonesData] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [maxColumn, setMaxColumn] = useState();
  const [loading, setLoading] = useState(true);

  const [zones, setZones] = useState({});
  const [screens, setScreens] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const showTime = searchParams.get("time");
  const theatre = searchParams.get("theatre");
  const screen = searchParams.get("screen");
  const showId = searchParams.get("showId");
  const screenId = searchParams.get("screenId");
  const theatreId = searchParams.get("theatreId");
  const movieId = searchParams.get("movieId");

  useEffect(() => {
    if (showTime) {
      const timeParts = showTime.split(":");
      if (timeParts.length === 3) {
        setFormattedTime(`${timeParts[0]}:${timeParts[1]}`);
      }
    }
  }, [showTime]);

  useEffect(() => {
    fetchSeatData();
  }, []);

  const [zoneNames, setZoneNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchMovieData();
      await fetchZonesData();
      await fetchShowData();
      // await fetchBookedTickets();
      // await fetchOtherShows();
      await fetchScreens();
    };
    fetchData();
    setLoading(false);
  }, [showId]);

  const fetchZonesData = async () => {
    try {
      const { data, error } = await supabase
        .from("zones")
        .select("*")
        .eq("screenId", screenId);
      if (error) throw error;
      if (data) {
        setZonesData(data);

        const names = data.reduce((acc, zone) => {
          acc[zone.id] = zone.name;
          return acc;
        }, {});
        setZoneNames(names);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieData = async () => {
    try {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", movieId);
      if (error) throw error;
      if (data) {
        setMovieData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShowData = async () => {
    try {
      const { data, error } = await supabase
        .from("shows")
        .select("*, showTime(*)")
        .eq("id", showId);

      if (error) throw error;

      if (data) {
        setShowData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchOtherShows = async () => {
  //   try {
  //     const {
  //       data: otherShowsDataResponse,
  //       error: otherShowsDataResponseError,
  //     } = await supabase
  //       .from("shows")
  //       .select("*")
  //       .eq("date", date)
  //       .eq("screenId", screenId)
  //       .eq("movieId", movieId);

  //     if (otherShowsDataResponseError) {
  //       console.log(otherShowsDataResponseError);
  //       return;
  //     }
  //     setOtherShows(otherShowsDataResponse);

  //     const otherShowsTimeIds = otherShowsDataResponse.map(
  //       (show) => show.showTimeId
  //     );

  //     const {
  //       data: otherShowsTimeDataResponse,
  //       error: otherShowsTimeDataResponseError,
  //     } = await supabase
  //       .from("showTime")
  //       .select("*")
  //       .in("id", otherShowsTimeIds);

  //     if (otherShowsTimeDataResponseError) {
  //       return;
  //     }
  //     setOtherShowTimes(otherShowsTimeDataResponse);
  //   } catch (error) {
  //     console.log("Error in fetching other shows", error);
  //   }
  // };

  const fetchScreens = async () => {
    try {
      if (screenId) {
        const { data, error } = await supabase
          .from("screens")
          .select("*")
          .eq("id", screenId);
        if (data) {
          setScreens(data);
          console.log("screens", data);
        }
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log("Error in fetching screens", error);
    }
  };

  const groupSeatDataByZone = (seatData, totalColumns) => {
    const zonesMap = {};

    seatData.forEach((seat) => {
      const zoneId = seat.zoneId;
      const rowIndex = seat.row - 1;
      const columnIndex = seat.column - 1;
      const column = seat.column;

      // Initialize the zone if not already present
      if (!zonesMap[zoneId]) {
        zonesMap[zoneId] = [];
      }

      // Initialize the row if not already present
      if (!zonesMap[zoneId][rowIndex]) {
        zonesMap[zoneId][rowIndex] = new Array(totalColumns).fill(null);
      }

      // Add the seat or a placeholder based on the column index
      zonesMap[zoneId][rowIndex][columnIndex] = {
        number: seat.seatName,
        column: column,
        status: seat.status || "available", // Use actual status if available
        isSeat: true,
      };
    });

    // Fill in empty slots with placeholders if necessary
    for (const zoneId in zonesMap) {
      zonesMap[zoneId].forEach((row, rowIndex) => {
        for (let i = 0; i < totalColumns; i++) {
          if (!row[i]) {
            row[i] = {
              isSeat: false,
            };
          }
        }
      });
    }

    console.log(zonesMap);
    return zonesMap;
  };
  const fetchSeatData = async () => {
    try {
      const { data, error } = await supabase
        .from("seats")
        .select("*")
        .eq("screenId", screenId); // Fetching all zones for the screen

      if (error) throw error;

      if (data) {
        const maxColumn = Math.max(
          ...data.map((seat) => parseInt(seat.column))
        );
        setMaxColumn(maxColumn);
        const groupedData = groupSeatDataByZone(data, maxColumn);
        setZones(groupedData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchBookedTickets = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("tickets")
  //       .select("*")
  //       .eq("showId", showId);

  //     if (data) {
  //       console.log("booked tickets", data);
  //       const seatIds = data.map((ticket) => ticket.seatId);
  //       const seatResponses = await Promise.all(
  //         seatIds.map(async (seatId) => {
  //           const { data: seatData, error: seatError } = await supabase
  //             .from("seats")
  //             .select("zoneId, row, column")
  //             .eq("id", seatId);
  //           if (seatData) {
  //             return seatData[0];
  //           }
  //           if (seatError) {
  //             console.log("Error fetching seat:", seatError);
  //             return null;
  //           }
  //         })
  //       );
  //       console.log("Seat details:", seatResponses);
  //       setSeatResponses(seatResponses);
  //     }

  //     if (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.log("Error in fetching booked tickets", error);
  //   }
  // };

  // const updateBookedSeats = (newBookedSeats) => {
  //   console.log("Updating booked seats:", newBookedSeats);
  //   setBookedSeats(newBookedSeats);
  // };

  const queryParams = `?date=${date}&time=${formattedTime}&theatre=${theatre}&screen=${screen}&theatreId=${theatreId}&movieId=${movieId}&stallSeats=${selectedStallSeats}&balconySeats=${selectedBalconySeats}`;

  const handleSeatClick = (zoneId, row, seat) => {
    const zoneName = zoneNames[zoneId];
    const seatKey = `${zoneName}-${seat.number}`;
    setSelectedBalconySeats((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
  };
  console.log(selectedBalconySeats);
  const handleMouseEnter = (zoneId, row, seat) => {
    const zoneName = zoneNames[zoneId];
    const seatKey = `${zoneName}-${seat.number}`;
    setSeatHovered((prev) => ({
      ...prev,
      [seatKey]: true,
    }));
  };

  const handleMouseLeave = (zoneId, row, seat) => {
    const zoneName = zoneNames[zoneId];
    const seatKey = `${zoneName}-${seat.number}`;
    setSeatHovered((prev) => ({
      ...prev,
      [seatKey]: false,
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderAllZonesSeats = () => {
    return Object.keys(zones).map((zoneId) => {
      const zoneSeats = zones[zoneId] || [];
      const zoneName = zoneNames[zoneId] || `Zone ${zoneId}`;

      return (
        <div key={zoneId} className="zone-container mb-8">
          <div className="mt-8 text-gray-500 mb-5 text-center">{zoneName}</div>
          {zoneSeats.length > 0 ? (
            <div>
              {/* Static Column Names */}
              <div className="flex justify-center mb-2">
                <div className="flex items-center mr-2"></div>{" "}
                {/* Empty for alignment */}
              </div>

              {zoneSeats.map((row, rowIndex) => (
                <div className="flex justify-center mb-2" key={rowIndex}>
                  {/* Static Row Name */}
                  <div className="flex items-center mr-2 text-lg font-medium">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                  {/* Seats */}
                  {row.map((seat, seatIndex) => {
                    const seatKey = `${zoneName}-${seat.number}`;

                    const isSelected = selectedBalconySeats.includes(seatKey);
                    const isHovered = seatHovered[seatKey];
                    const isActive = seat.isSeat;

                    return (
                      <>
                        {isActive ? (
                          <div
                            key={seatIndex}
                            className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 transition-colors duration-200`}
                            style={{ position: "relative" }}
                            onClick={() =>
                              handleSeatClick(zoneId, seat.row, seat)
                            }
                            onMouseEnter={() =>
                              handleMouseEnter(zoneId, seat.row, seat)
                            }
                            onMouseLeave={() =>
                              handleMouseLeave(zoneId, seat.row, seat)
                            }
                          >
                            <svg
                              width="20"
                              height="23.33"
                              viewBox="0 0 30 35"
                              xmlns="http://www.w3.org/2000/svg"
                              className="seat-icon"
                            >
                              <path
                                d="M3.74219 6C3.74219 2.68629 6.42848 0 9.74219 0H20.7422C24.0559 0 26.7422 2.68629 26.7422 6V24H3.74219V6Z"
                                fill={
                                  isHovered || isSelected
                                    ? "#1CCE83"
                                    : "#CE1C1C"
                                }
                              />
                              <rect
                                x="3.74219"
                                y="26"
                                width="23"
                                height="9"
                                fill={
                                  isHovered || isSelected
                                    ? "#1CCE83"
                                    : "#CE1C1C"
                                }
                              />
                              <rect
                                x="24.7422"
                                y="16"
                                width="5"
                                height="16"
                                fill={
                                  isHovered || isSelected
                                    ? "#1CCE83"
                                    : "#CE1C1C"
                                }
                              />
                              <rect
                                x="0.742188"
                                y="16"
                                width="5"
                                height="16"
                                fill={
                                  isHovered || isSelected
                                    ? "#1CCE83"
                                    : "#CE1C1C"
                                }
                              />
                            </svg>
                            {(isHovered || isSelected) && (
                              <span className="text-white font-semibold text-xs mb-2 absolute seat-icon">
                                {seat.column}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div
                            key={seatIndex}
                            className={`w-8 h-8 m-1 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 transition-colors duration-200`}
                            style={{ position: "relative" }}
                            onClick={() =>
                              handleSeatClick(
                                zoneId,
                                seat.row,
                                rowIndex,
                                seatIndex
                              )
                            }
                            onMouseEnter={() =>
                              handleMouseEnter(
                                zoneId,
                                seat.row,
                                rowIndex,
                                seatIndex
                              )
                            }
                            onMouseLeave={() =>
                              handleMouseLeave(
                                zoneId,
                                seat.row,
                                rowIndex,
                                seatIndex
                              )
                            }
                          >
                            {(isHovered || isSelected) && (
                              <span className="text-white text-xs absolute bottom-1">
                                {seat.row}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })}
                  {/* Static Row Name */}
                  <div className="flex items-center ml-2 text-lg font-medium">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              No seats available in this zone.
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
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
        <>
          {" "}
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
                        strokeWidth="1.5"
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
                    strokeWidth="6"
                  />
                </svg>
              </div>

              <div className=" p-4 mx-2  mt-4 overflow-x-auto">
                {renderAllZonesSeats()}
              </div>
            </div>
          </section>
          <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 shadow-md">
            <div className="flex justify-between items-center container mx-auto">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  Time:{" "}
                  <span className="font-bold text-black">
                    {date} {formattedTime} {/*16 Jan 2024 14 :40*/}
                  </span>
                </span>
                <span className="text-gray-600">
                  Screen:{" "}
                  <span className="font-bold text-black">
                    {" "}
                    {theatre} [{screen}]
                  </span>
                </span>
              </div>

              <Link href={`/movies/id/seats/payment${queryParams}`} passHref>
                <button
                  className={`py-2 px-16 rounded-lg ${
                    selectedStallSeats.length > 0 ||
                    selectedBalconySeats.length > 0
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400"
                  } text-white`}
                  disabled={
                    selectedStallSeats.length === 0 &&
                    selectedBalconySeats.length === 0
                  }
                >
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;
