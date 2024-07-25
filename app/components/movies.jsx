"use client";

import { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient";
import Image from "next/image";
import Link from "next/link";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedDay, setSelectedDay] = useState("today");
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [selectedDay, selectedGenre, selectedLanguage]);

  useEffect(() => {
    fetchGenresAndLanguages();
  }, []);

  const fetchGenresAndLanguages = async () => {
    let { data: genresData, error: genresError } = await supabase
      .from("genres")
      .select("*");

    let { data: languagesData, error: languagesError } = await supabase
      .from("languages")
      .select("*");

    if (genresError) console.error("Error fetching genres:", genresError);
    if (languagesError)
      console.error("Error fetching languages:", languagesError);

    setGenres(genresData);
    setLanguages(languagesData);
  };

  const fetchMovies = async () => {
    setIsLoading(true);

    const today = new Date();
    let targetDate;
    if (selectedDay === "tomorrow") {
      targetDate = new Date(today);
      targetDate.setDate(today.getDate() + 1);
    } else if (selectedDay === "comingSoon") {
      targetDate = new Date(today);
      targetDate.setDate(today.getDate() + 7); // Assuming 'coming soon' means 7 days from today
    } else {
      targetDate = today;
    }

    const formattedDate = targetDate.toISOString().split("T")[0];
    console.log(formattedDate);

    let showsQuery = supabase
      .from("shows")
      .select("movieId")
      .eq("date", formattedDate);

    let { data: showsData, error: showsError } = await showsQuery;

    if (showsError) {
      console.error("Error fetching shows:", showsError);
      setIsLoading(false);
      return;
    }

    const movieIds = showsData.map((show) => show.movieId);

    let moviesQuery = supabase
      .from("movies")
      .select(
        `
        *,
        movie_genre (*, genre_id, genres (genre_name)),
        movie_language (*, language_id, languages (language_name))
      `
      )
      .in("id", movieIds);

    if (selectedGenre) {
      moviesQuery = moviesQuery.eq("movie_genre.genre_id", selectedGenre);
    }

    if (selectedLanguage) {
      moviesQuery = moviesQuery.eq(
        "movie_language.language_id",
        selectedLanguage
      );
    }

    let { data: moviesData, error: moviesError } = await moviesQuery;

    if (moviesError) {
      console.error("Error fetching movies:", moviesError);
    }

    setMovies(moviesData);
    setIsLoading(false);
  };

  const formatDuration = (duration) => {
    const [hrs, mins] = duration.split(":").map(Number);
    return `${hrs}hr ${mins}min`;
  };

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string" || !string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getYearFromDate = (date) => {
    const dateParts = date.split("/");
    if (dateParts.length === 3) {
      return dateParts[2];
    }
    return "-";
  };

  console.log(movies);
  return (
    <div className="bg-pink-50 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between mb-6 px-2">
          <div className="flex space-x-4">
            <h6
              className={`text-xs sm:text-lg font-semibold cursor-pointer ${
                selectedDay === "today" ? "text-purple-600" : "text-black"
              }`}
              onClick={() => setSelectedDay("today")}
            >
              Today
            </h6>
            <h6
              className={`text-xs sm:text-lg font-semibold cursor-pointer ${
                selectedDay === "tomorrow" ? "text-purple-600" : "text-black"
              }`}
              onClick={() => setSelectedDay("tomorrow")}
            >
              Tomorrow
            </h6>
            <h6
              className={`text-xs sm:text-lg font-semibold cursor-pointer ${
                selectedDay === "comingSoon" ? "text-purple-600" : "text-black"
              }`}
              onClick={() => setSelectedDay("comingSoon")}
            >
              Coming Soon
            </h6>
          </div>
          <div className="hidden md:flex space-x-4">
            <select
              className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-15 lg:w-36"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.genre_name}
                </option>
              ))}
            </select>
            <select
              className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm w-15 lg:w-36"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Language</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.language_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex md:hidden text-xs sm:text-lg space-x-4">
            <button className="text-purple-600">See all</button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((item, index) => (
              <Link key={index} href={`/movies/${item.id}`} passHref>
                <div key={index} className="p-2">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    width={200}
                    height={280}
                    className="w-full h-30 md:72 rounded-lg"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                  <p className="text-xs mt-2">
                    {capitalizeFirstLetter(
                      item.movie_genre[0]?.genres?.genre_name
                    )}
                    /{getYearFromDate(item.release_date)}/
                    {formatDuration(item.duration)}/
                    {item.movie_language[0]?.languages?.language_name}
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
