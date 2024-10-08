"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "./../../supabaseClient";

function Movie() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shows, setShows] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [selectedShowTime, setSelectedShowTime] = useState(null);

  const [selectedDateTime, setSelectedDateTime] = useState();

  const [isLoading, setIsLoading] = useState(true);

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
  const today = new Date();
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
    for (let i = 0; i < 9; i++) {
      const date = new Date();
      date.setDate(currentDate + i);
      currentWeekDates.push(date);
    }
    return currentWeekDates;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    fetchShows(date);
  };

  const fetchShows = async (date) => {
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    const { data: shows, error } = await supabase
      .from("shows")
      .select("*")
      .eq("movieId", movieId)
      .eq("date", formattedDate);

    if (error) {
      console.error("Error fetching shows:", error);
    } else {
      //console.log(shows);
      setShows(shows);
      const showTimeIds = shows.map((show) => show.showTimeId);
      const theatreIds = shows.map((show) => show.theatreId);
      const screenIds = shows.map((show) => show.screenId);
      //console.log(screenIds);

      fetchShowTimes(showTimeIds);
      fetchTheatres(theatreIds);
      fetchScreens(screenIds);
    }
  };

  console.log(theatres);

  const fetchTheatres = async (theatreIds) => {
    const { data: theatres, error } = await supabase
      .from("theatres")
      .select("*")
      .in("id", theatreIds);

    if (error) {
      console.error("Error fetching theaters:", error);
    } else {
      setTheatres(theatres);
      console.log(theatres);
    }
  };

  const fetchScreens = async (screenIds) => {
    const { data: screens, error } = await supabase
      .from("screens")
      .select("*")
      .in("id", screenIds);

    if (error) {
      console.error("Error fetching Screens:", error);
    } else {
      setScreens(screens);
      console.log(screens);
    }
  };

  const fetchShowTimes = async (showTimeIds) => {
    const { data: showTimes, error } = await supabase
      .from("showTime")
      .select("*")
      .in("id", showTimeIds);

    if (error) {
      console.error("Error fetching show times:", error);
    } else {
      setShowTimes(showTimes);
      console.log(showTimes);
    }
  };

  const formatShowTime = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    fetchShows(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (movieId) {
      // Fetch movie data from Supabase
      const fetchMovieData = async () => {
        const { data: movie, error } = await supabase
          .from("movies")
          .select(
            `
            *,
            movie_genre (
              genre_id,
              genres (genre_name)
            ),
            movie_language (
              language_id,
              languages (language_name)
            ),
            movie_cast (
              cast_id,
              cast (*)
            ), movie_crew(
              crew_id,
              crew (*)
            )
          `
          )
          .eq("id", movieId)
          .single();

        if (error) {
          console.error("Error fetching movie data:", error);
        } else {
          setMovieData(movie);
          setMovieGenres(
            movie.movie_genre.map((genre) => genre.genres.genre_name)
          );
          setMovieCast(
            movie.movie_cast.map((cast) => ({
              name: cast.cast.name,
              category: cast.cast.category,
              image: cast.cast.image,
            }))
          );
          setMovieCrew(
            movie.movie_crew.map((crew) => ({
              name: crew.crew.name,
              category: crew.crew.category,
              image: crew.crew.image,
            }))
          );
        }
      };

      fetchMovieData();
    }
  }, [movieId]);
  console.log(movieData);

  useEffect(() => {
    if (movieId) {
      // Fetch related movies data from Supabase
      const fetchRelatedMovies = async () => {
        const { data: movies, error } = await supabase
          .from("movies")
          .select("*")
          .neq("id", movieId)
          .limit(5);

        if (error) {
          console.error("Error fetching related movies:", error);
        } else {
          setRelatedMovies(movies);
        }
      };

      fetchRelatedMovies();
    }
  }, [movieId]);

  const formatDuration = (duration) => {
    if (!duration || typeof duration !== "string") {
      return "loading";
    }

    const [hrs = 0, mins = 0] = duration.split(":").map(Number);
    return `${hrs}hr ${mins}min`;
  };
  const groupShowsByTheatreAndScreen = () => {
    const grouped = theatres.reduce((acc, theatre) => {
      const theatreShows = shows.filter(
        (show) => show.theatreId === theatre.id
      );
      const screensForTheatre = screens.filter((screen) =>
        theatreShows.some((show) => show.screenId === screen.id)
      );

      acc[theatre.id] = screensForTheatre.map((screen) => ({
        screen,
        shows: theatreShows.filter((show) => show.screenId === screen.id),
      }));

      return acc;
    }, {});
    return grouped;
  };

  const groupedShows = groupShowsByTheatreAndScreen();

  const handleShowTimeClick = (show) => {
    console.log(show);
    setSelectedShowTime(show);

    const showTime = showTimes.find((time) => time.id === show.showTimeId);
    const formattedTime = showTime ? formatShowTime(showTime.time) : "loading";

    const formattedDateTime = `${selectedDate.getDate()} ${
      months[selectedDate.getMonth()]
    } ${selectedDate.getFullYear()} ${formattedTime}`;
    console.log(formattedDateTime);
    setSelectedDateTime(formattedDateTime);
  };

  const renderGroupedShows = () => {
    const theatresWithShows = Object.keys(groupedShows).filter((theatreId) =>
      groupedShows[theatreId].some(({ shows }) => shows.length > 0)
    );

    if (theatresWithShows.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            className="h-10 w-10 mb-4 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            ></path>
          </svg>
          <span className="text-gray-500 text-lg font-semibold">No Result</span>
        </div>
      );
    }

    return theatresWithShows.map((theatreId) => {
      const theatre = theatres.find((theatre) => theatre.id == theatreId);
      return (
        <div key={theatreId} className="w-3/4 pb-5 mt-4 ">
          <div className="flex items-center space-x-2 pb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 56 56"
              className="h-8 w-8 text-gray-700 "
            >
              <path
                fill="currentColor"
                d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m-9.352-10.851c-.562-.422-.656-1.102-.328-2.063l2.86-8.554l-7.313-5.227c-.844-.586-1.148-1.242-.96-1.898c.21-.633.866-.961 1.874-.961l9 .07l2.742-8.602c.282-.96.774-1.476 1.477-1.476s1.172.515 1.477 1.476l2.742 8.602l8.976-.07c1.032 0 1.64.328 1.875.96c.235.657-.117 1.313-.937 1.899l-7.336 5.227l2.86 8.554c.327.961.234 1.64-.306 2.063c-.585.445-1.265.28-2.085-.328L28 35.407l-7.266 5.32c-.844.609-1.523.773-2.086.328"
              ></path>
            </svg>
            <h4 className="text-lg font-bold text-gray-800">
              {theatre ? theatre.name : "loading"}
            </h4>
          </div>
          <h2 className="text-sm pl-3 text-gray-600">{theatre.address}</h2>
          {groupedShows[theatreId].map(
            ({ screen, shows }) =>
              shows.length > 0 && (
                <div key={screen.id} className="mt-4">
                  <h5 className="text-lg pb-2 font-semibold">
                    {screen ? screen.name : "loading"}
                  </h5>
                  <div className="flex flex-wrap">
                    {shows.map((show) => {
                      const showTime = showTimes.find(
                        (time) => time.id === show.showTimeId
                      );

                      const formatDate = (date) => {
                        const options = {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        };
                        return date.toLocaleDateString("en-GB", options);
                      };
                      console.log(theatre.name);
                      const queryParams = `?date=${formatDate(
                        selectedDate
                      )}&time=${showTime?.time}&theatre=${
                        theatre.name
                      }&screen=${screen.name}&showId=${show.id} }&screenId=${
                        show.screenId
                      }&theatreId=${show.theatreId}&movieId=${movieId}`;

                      return (
                        <Link
                          key={show.id}
                          href={`/movies/${movieId}/seats${queryParams}`}
                          passHref
                        >
                          <span
                            className={`py-1 px-2 m-1 rounded cursor-pointer ${
                              selectedShowTime === show
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white"
                            }`}
                            onClick={() => handleShowTimeClick(show)}
                          >
                            {showTime
                              ? formatShowTime(showTime.time)
                              : "loading"}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </div>
      );
    });
  };

  return (
    <div className=" bg-gray-100">
      <header className="absolute top-0 bg-white left-0 right-0 z-50">
        <div className=" mx-auto">
          <nav className="flex items-center justify-between py-2 px-2">
            <h1 className="text-sm md:text-lg font-extrabold">Seat Snaps</h1>

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
        <div className="container mx-auto  px-2">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left section */}
            <div className="lg:col-span-1">
              <div className="pl-0  ">
                <img
                  src={movieData.poster}
                  alt="Movie Poster"
                  className=" w-full h-64 md:1/4 rounded-lg"
                  style={{ objectFit: "fill" }}
                  loading="lazy"
                />
              </div>
              <div className="relative justify-center mt-4 w-full">
                <a
                  href={movieData.trailer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex  items-center justify-center bg-gray-300  text-black py-2 px-2 rounded-3xl w-full md:w-full"
                >
                  <div className="pr-3  ">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2 20.3V7.7L19.6 14M14 0C12.1615 0 10.341 0.362121 8.64243 1.06569C6.94387 1.76925 5.40052 2.80048 4.1005 4.1005C1.475 6.72601 0 10.287 0 14C0 17.713 1.475 21.274 4.1005 23.8995C5.40052 25.1995 6.94387 26.2307 8.64243 26.9343C10.341 27.6379 12.1615 28 14 28C17.713 28 21.274 26.525 23.8995 23.8995C26.525 21.274 28 17.713 28 14C28 12.1615 27.6379 10.341 26.9343 8.64243C26.2307 6.94387 25.1995 5.40052 23.8995 4.1005C22.5995 2.80048 21.0561 1.76925 19.3576 1.06569C17.659 0.362121 15.8385 0 14 0Z"
                        fill="#2349F7"
                      />
                    </svg>
                  </div>
                  Watch Trailer
                </a>
              </div>
              <h1 className="text-2xl font-bold py-3 mt-4">
                {movieData.title}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                {movieData?.movie_language?.[0]?.languages?.language_name && (
                  <span className="bg-blue-600 text-rose-200 mr-4 text-sm font-semibold px-4 py-1.5 rounded">
                    {movieData.movie_language[0].languages.language_name}
                  </span>
                )}
                <span className=" border border-neutral-400 ml-4 px-4 py-1.5 bg-white text-black rounded text-sm">
                  {formatDuration(movieData.duration)}
                </span>
              </div>
              <p className="text-sm mt-4">{movieData.synopsis}</p>
              <div className="flex flex-wrap mt-4">
                {movieGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-white text-gray-800 shadow-lg text-xs font-semibold mr-2 px-2 py-1 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-semibold mt-4 mb-4">Cast</h2>
              <div className="flex space-x-4 items-center mx-auto mt-2 m">
                {movieCast?.map((cast, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-3 overflow-hidden">
                      {cast.image ? (
                        <img
                          src={cast.image}
                          alt={cast.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-300">
                          <span className="text-sm text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold">{cast.name}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mt-4 mb-4 ">Crew</h2>
              <div className="flex space-x-4 mt-2 mb-4">
                {movieCrew?.map((crew, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg overflow-hidden">
                      {crew.image ? (
                        <img
                          src={crew.image}
                          alt={crew.name}
                          className="w-full h-full  rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-300">
                          <span className="text-sm text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    <span className="text-xs mt-1">{crew.name}</span>
                  </div>
                ))}
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
            <div className="lg:col-span-4">
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
                {getCurrentWeekDates().map((date, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center  justify-center w-20 h-20  rounded-lg ${
                      date.toDateString() === selectedDate.toDateString()
                        ? "bg-red-600 text-white"
                        : " bg-white border border-gray-600 hover:bg-red-600 hover:text-white text-gray-600"
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <span className="text-sm">
                      {date.getDate()} {months[currentMonth]}
                    </span>
                    <span className="mt-1 text-lg font-semibold">
                      {daysOfWeek[date.getDay()]}
                    </span>
                  </button>
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

              <div className="bg-white p-6 rounded-lg overflow-y-scroll min-h-screen">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex relative items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a6 6 0 00-6 6c0 4.32 6 10 6 10s6-5.68 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="text"
                      className="border rounded-lg px-8 py-2"
                      placeholder="Search City"
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

                <div>{renderGroupedShows()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="container mt-5 mx-auto">
        <h2 className=" text-xl md:text-2xl font-bold mb-0 md:mb-6">
          Related movies
        </h2>
        <div className="grid grid-cols-3  md:grid-cols-5 gap-4">
          {relatedMovies &&
            relatedMovies.map((movie) => (
              <div key={movie.id} className="  flex mr-5">
                <div className="relative bg-white mb-6 w-150 h-180  shadow-lg ">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    fill="true"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
