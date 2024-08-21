// pages/index.js

"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navBar";
import { supabase } from "../../supabaseClient";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { theatreId } = useParams();

  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(theatreId);

  useEffect(() => {
    fetchTheatres();
    fetchMovieData();
  }, []);

  const fetchTheatres = async () => {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("theatres") // Replace 'movies' with your actual table name
      .select("*")
      .eq("id", theatreId);

    console.log(data);

    if (error) console.error("Error fetching data:", error);
    setTheatres(data);

    setIsLoading(false);
  };

  const today = new Date();
  let targetDate;

  targetDate = new Date(today);
  const formattedDate = targetDate.toISOString().split("T")[0];

  const fetchMovieData = async () => {
    try {
      const { data: showsData, error: showsError } = await supabase
        .from("shows")
        .select("movieId")
        .eq("theatreId", theatreId)
        .eq("date", formattedDate);

      if (showsError) {
        console.error("Error fetching shows:", showsError);
        setIsLoading(false);
        return;
      }

      if (showsData) {
        const movieIds = showsData.map((show) => show.movieId);
        // setIsLoading(false);
        console.log(showsData);
        let moviesQuery = supabase
          .from("movies")
          .select(
            `*,
          movie_genre!inner(*, genre_id, genres!inner(id,genre_name)),
          movie_language!inner (*, language_id, languages!inner (language_name))
        `
          )
          .in("id", movieIds);

        let { data: moviesData, error: moviesError } = await moviesQuery;

        if (moviesError) {
          console.error("Error fetching movies:", moviesError);
        }

        setMovies(moviesData);
        setIsLoading(false);
        console.log(moviesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const timings = ["14:30", "18:00", "20:30"];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDayOfWeek = today.getDay();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentWeekDates = () => {
    const currentWeekDates = [];
    const currentDate = new Date().getDate(); // Get the current day of the month

    for (let i = 0; i < 9; i++) {
      const date = new Date(); // Initialize a new Date object
      date.setDate(currentDate + i); // Set the date to the current day + i
      currentWeekDates.push(date);
    }

    return currentWeekDates;
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto pt-10 mt-10 px-4 py-6">
        <div className="ml-auto flex justify-between">
          <h1 className=" font-bold text-xl">{theatres[0]?.name}</h1>
          <input
            type="text"
            placeholder="Search Your Movie"
            className="px-4 py-2 border border-gray-300 rounded-lg w-64"
          />
        </div>

        <div className="flex items-center space-x-6">
          <h2 className="text-lg font-semibold">Now Showing</h2>
          <h2 className="text-lg text-gray-500">Upcoming</h2>
        </div>

        {/* Date Selection */}
        <div className="mt-4 flex space-x-2">
          {getCurrentWeekDates().map((day, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg ${
                index === 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <div>
                {day.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
              </div>
              <div>{daysOfWeek[day.getDay()]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Movie List */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex">
            <div className="flex-shrink-0">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={80}
                height={120}
                className="rounded-md"
              />
            </div>
            <div className="ml-6 flex-grow">
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p className="text-gray-500">{movie.duration}</p>
              <div className="mt-2">
                <p>Balcony: Rs. 1600 | Full Rs. 800.00 | Half Rs. 500.00</p>
              </div>
              <div className="mt-4 flex space-x-2">
                {timings.map((time, index) => (
                  <button
                    key={index}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promotions Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Promotions
              </div>
            </div>
            <h3 className="text-4xl font-bold">Buy one get one Free</h3>
            <p className="text-gray-500">
              Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <p className="text-gray-500">until 05th May 2025</p>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold">
              View Deal
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/promo1.png"
              alt="Promo 1"
              width={350}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
