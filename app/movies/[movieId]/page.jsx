import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../../public/assets/images/indian2.png";
import movie1 from "../../../public/assets/images/indian2.png";
import movie2 from "../../../public/assets/images/movie9.png";
import movie3 from "../../../public/assets/images/movie10.png";
import movie4 from "../../../public/assets/images/maharaja.png";
import movie5 from "../../../public/assets/images/movie5.png";
import sel from "../../../public/assets/images/selection.png";

function Movie() {
  const dates = [
    { day: "THU", date: "15 Jan" },
    { day: "FRI", date: "16 Jan", isSelected: true },
    { day: "SAT", date: "17 Jan" },
    { day: "SUN", date: "18 Jan" },
    { day: "MON", date: "19 Jan" },
    { day: "TUE", date: "20 Jan" },
    { day: "WED", date: "21 Jan" },
  ];
  const movieData = [
    {
      id: 1,
      img: movie1,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 2,
      img: movie2,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 3,
      img: movie3,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 4,
      img: movie4,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 5,
      img: movie5,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
  ];

  return (
    <div className=" bg-gray-100">
      <header className="absolute top-0 bg-white left-0 right-0 z-50">
        <div className=" mx-auto">
          <nav className="flex items-center justify-between py-2 px-2">
            <h1 className="text-sm md:text-lg font-extrabold">
              TheTicketBooking
            </h1>

            <div className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" passHref>
                    <span className="font-semibold text-sm cursor-pointer">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/our-theaters" passHref>
                    <span className="font-semibold text-sm cursor-pointer">
                      Our Theaters
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/movies" passHref>
                    <span className="font-semibold text-sm cursor-pointer">
                      Movies
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/register-theater" passHref>
                    <span className="font-semibold text-sm cursor-pointer">
                      Register a theater
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden md:block">
              <Link href="/book-ticket" passHref>
                <span className="inline-block bg-purple-600 text-sm text-white py-2 px-6 rounded-full hover:bg-purple-700 font-semibold cursor-pointer">
                  Book a ticket
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left section */}
            <div className="lg:col-span-1">
              <div className="pl-0">
                <Image
                  src={img}
                  alt="Movie Poster"
                  className=" w-full h-30 md:30  rounded-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="">
                <button className=" flex mt-4  bg-gray-200 text-right text-black  py-2 px-2   ml-14  rounded-3xl w-1/2">
                  <div className="px-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 bg-blue-600 text-white rounded-2xl "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                      />
                    </svg>
                  </div>
                  Watch Trailer
                </button>
              </div>
              <h1 className="text-2xl font-bold mt-4">
                The Ministry of Ungentlemanly Warfare
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  ENGLISH
                </span>
                <span className="text-sm">1h 44m</span>
              </div>
              <div className="flex flex-wrap mt-4">
                {[
                  "Action",
                  "Comedy",
                  "Horror",
                  "Musical",
                  "Fantasy",
                  "Romance",
                  "Thriller",
                  "Mystery",
                  "Documentary",
                  "Musical",
                  "Science Fiction",
                ].map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                scelerisque ultrices lorem, et feugiat risus ultricies eu.
                Nullam vel libero eget elit volutpat elementum. Cras sit amet
                sem sed elit malesuada volutpat. Curabitur ultricies libero ac
                nibh tincidunt, non facilisis tortor cursus.
              </p>
              <h2 className="text-xl font-semibold mt-4 mb-4">
                Role in the Film
              </h2>
              <div className="flex space-x-4 mt-2 m">
                {["Actor", "Director", "Musician"].map((role) => (
                  <div key={role} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
                    <span className="text-sm font-semibold">{role}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mt-4 mb-4 ">
                Peripheral roles
              </h2>
              <div className="flex space-x-4 mt-2 mb-4">
                {["Emily", "Sophia", "Liam", "Benjamin", "David", "John"].map(
                  (role, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>

                      <span className="text-xs mt-1">{role}</span>
                    </div>
                  )
                )}
                <div className=" -pl-4 mt-4">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 pb-5">
                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {dates.map((date, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center w-20 h-20  rounded-lg ${
                      date.isSelected
                        ? "bg-red-600 text-white"
                        : "border border-gray-300 text-gray-600"
                    }`}
                  >
                    <span className="text-sm">{date.date}</span>
                    <span className="mt-1 text-lg font-semibold">
                      {date.day}
                    </span>
                  </div>
                ))}
                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg ">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a6 6 0 00-6 6c0 4.32 6 10 6 10s6-5.68 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <select className="border rounded-lg px-3 py-2">
                      <option>Jaffna</option>
                      <option>Colombo</option>
                      <option>Kandy</option>
                    </select>
                  </div>
                  <div className="relative  border-black">
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 "
                      placeholder="Regal"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 absolute right-3 top-2.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.9 14.32a8 8 0 111.414-1.414l5.386 5.387a1 1 0 01-1.414 1.414l-5.386-5.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">REGAL</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "SILVER 2D",
                      "GOLD 2D",
                      "PLATINUM 2D",
                      "REGAL 3D",
                      "2D",
                    ].map((type, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">{type}</h4>
                          <p className="mt-2">
                            Rs. {index % 2 === 0 ? "800.00" : "1000.00"}
                          </p>
                        </div>

                        <div className="grid grid-cols-5 gap-5 w-1/2 mt-2">
                          {[
                            "05:00",
                            "05:30",
                            "05:45",
                            "06:15",
                            "06:45",
                            "13:00",
                            "16:00",
                            "19:00",
                          ].map((time, idx) => (
                            <span
                              key={idx}
                              className={`py-1 px-2 rounded ${
                                idx === 1
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-300 text-gray-800"
                              }`}
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <img
                  src={sel}
                  alt="Cinema items"
                  className="w-32 h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex items-center">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Selections
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm mb-2">
                        Screen:{" "}
                        <span className="font-semibold text-lg">
                          Regal [ SILVER 2D ]
                        </span>
                      </p>
                      <p className="text-sm">
                        Time:{" "}
                        <span className="font-semibold text-lg">
                          16 Jan 2024 14:40
                        </span>
                      </p>
                    </div>
                    <Link href={`/movies/id/seats`} passHref>
                      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 9l4 4-4 4m6-8l4 4-4 4"
                          />
                        </svg>
                        Seats
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs mt-2 text-gray-500">
                * Seat selection can be done after this
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="container mx-auto">
        <h2 className=" text-xl md:text-2xl font-bold mb-0 md:mb-4">
          Related movies
        </h2>
        <div className="grid grid-cols-3  md:grid-cols-5 gap-4">
          {movieData.map((movie) => (
            <div key={movie.id} className="relative mr-5">
              <div className="hidden md:block">
                <div className="relative bg-white w-150 h-180 rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={movie.img}
                    alt={movie.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
