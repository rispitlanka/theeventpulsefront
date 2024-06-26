import React from "react";
import Image from "next/image";
import movie1 from "../../public/assets/images/indian2.png";
import movie2 from "../../public/assets/images/movie9.png";
import movie3 from "../../public/assets/images/movie10.png";
import movie4 from "../../public/assets/images/maharaja.png";
import movie5 from "../../public/assets/images/movie5.png";

export const TopFive = () => {
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
    <div className=" items-start md:items-center justify-center bg-white p-4 pt-10 pb-20 m-10 px-0 md:px-10">
      <h1 className=" text-lg md:text-4xl font-bold mb-0 md:mb-10">
        Top 5 of the Week
      </h1>
      <div className="grid grid-cols-3  md:grid-cols-5 gap-4">
        {movieData.map((movie) => (
          <div key={movie.id} className="relative mr-5">
            <div className="hidden md:block">
              <div className="relative bg-white  rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
                  {movie.title}
                </div>
              </div>
              <div className="absolute bottom-0 -m-10 -left-2  text-gray-100 text-5xl md:text-9xl font-extrabold p-4">
                {movie.id}
              </div>
            </div>
          </div>
        ))}
        <div className="flex md:hidden">
          <div className="w-2/3 bg-gray-700 h-20"></div>
          <div className="w-2/3 bg-gray-700 h-20"></div>
          <div className="w-2/3 bg-gray-700 h-20"></div>
        </div>
      </div>
    </div>
  );
};
