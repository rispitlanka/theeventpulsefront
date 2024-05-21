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

const Movies = () => {
  const movieData = [
    {
      img: movie1,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie2,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie3,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie4,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie5,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie6,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie7,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie8,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie9,
      title: "Indian 2",
      genres: "Action",
      year: "2024",
      duration: "1h 52min",
      languages: "Tamil",
    },
    {
      img: movie10,
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
              className={`text-lg font-semibold cursor-pointer ${
                selectedDay === "today" ? "text-purple-600" : "text-black"
              }`}
              onClick={() => setSelectedDay("today")}
            >
              Today
            </h6>
            <h6
              className="text-lg font-semibold cursor-pointer"
              onClick={() => setSelectedDay("tomorrow")}
            >
              Tomorrow
            </h6>
            <h6
              className="text-lg font-semibold cursor-pointer"
              onClick={() => setSelectedDay("comingSoon")}
            >
              Coming Soon
            </h6>
          </div>
          <div className="flex space-x-4">
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-36">
              <option>Genre</option>
            </select>
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-36">
              <option>Language</option>
            </select>
            <select className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-36">
              <option>Duration</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader"> loading... </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movieData.map((item, index) => (
              <div key={index} className="p-2">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={280}
                  className="w-full h-72 object-cover rounded-lg"
                  loading="lazy"
                />
                <p className="text-sm mt-2">
                  {item.genres} / {item.year} / {item.duration} /{" "}
                  {item.languages}
                </p>
                <h6 className="text-lg font-semibold">{item.title}</h6>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
