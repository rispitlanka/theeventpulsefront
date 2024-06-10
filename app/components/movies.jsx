// app/movies/page.js

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import movie1 from "../../public/assets/images/movie1.png";
import movie2 from "../../public/assets/images/movie2.png";
import movie3 from "../../public/assets/images/movie3.png";
import movie4 from "../../public/assets/images/movie4.png";
import movie5 from "../../public/assets/images/movie5.png";
import movie6 from "../../public/assets/images/movie6.png";
import movie7 from "../../public/assets/images/movie7.png";
import movie8 from "../../public/assets/images/movie8.png";
import movie9 from "../../public/assets/images/movie9.png";
import movie10 from "../../public/assets/images/movie10.png";
import Link from "next/link";

const Movies = () => {
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
    {
      id: 6,
      img: movie6,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 7,
      img: movie7,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 8,
      img: movie8,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 9,
      img: movie9,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      id: 10,
      img: movie8,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
  ];

  const [selectedDay, setSelectedDay] = useState("today");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [selectedDay]);

  return (
    <div className="bg-pink-50 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between mb-6 px-2">
          <div className="flex space-x-4">
            <h6
              className={` text-xs sm:text-lg font-semibold cursor-pointer ${
                selectedDay === "today" ? "text-purple-600" : "text-black"
              }`}
              onClick={() => setSelectedDay("today")}
            >
              Today
            </h6>
            <h6
              className="text-xs sm:text-lg font-semibold cursor-pointer"
              onClick={() => setSelectedDay("tomorrow")}
            >
              Tomorrow
            </h6>
            <h6
              className="text-xs sm:text-lg font-semibold cursor-pointer"
              onClick={() => setSelectedDay("comingSoon")}
            >
              Coming Soon
            </h6>
          </div>
          <div className="hidden  md:block `flex space-x-4 `">
            <p></p>
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-15 lg:w-36">
              <option>Genre</option>
            </select>
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-15 lg:w-36">
              <option>Language</option>
            </select>
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-15 lg:w-36">
              <option>Duration</option>
            </select>
          </div>
          <div className="flex md:hidden text-xs sm:text-lg space-x-4">
            <button className="text-purple-600">See all</button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader"> loading... </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movieData.map((item, index) => (
              <Link key={index} href={`/movies/${item.id}`} passHref>
                <div key={index} className="p-2">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={200}
                    height={280}
                    className="w-full h-30 md:72 rounded-lg"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <p className="text-sm mt-2">
                    {item.genres} / {item.year} / {item.duration} /{" "}
                    {item.languages}
                  </p>
                  <h6 className="text-lg font-semibold">{item.title}</h6>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
