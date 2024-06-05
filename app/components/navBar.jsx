import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
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
    </div>
  );
}

export default Navbar;
