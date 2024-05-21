"use client";

import Link from 'next/link';
import MoviesSection from './components/movies';
import HeroSection from './components/heroSection';

import { TopFiv, TopFive } from './components/topfive';
import { Promotions } from './components/promotions';
import Theaters from './components/theaters';
import Footer from './components/footer';



const HomePage = () => {

  return (
    <div className=" vh-100 overflow-hidden " >
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className=" mx-auto">
          <nav className="flex items-center justify-between py-2 px-2">
            <h1 className="text-lg font-bold">TheTicketBooking</h1>

            <div className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" passHref>
                    <span className="font-semibold cursor-pointer">Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/our-theaters" passHref>
                    <span className="font-semibold cursor-pointer">Our Theaters</span>
                  </Link>
                </li>
                <li>
                  <Link href="/movies" passHref>
                    <span className="font-semibold cursor-pointer">Movies</span>
                  </Link>
                </li>
                <li>
                  <Link href="/register-theater" passHref>
                    <span className="font-semibold cursor-pointer">Register a theater</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link href="/book-ticket" passHref>
                <span className="inline-block bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 font-semibold cursor-pointer">
                  Book a ticket
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <HeroSection />
      <MoviesSection />

      <TopFive />
      <Promotions />
      <Theaters />
      <Footer />
    </div>
  );
};

export default HomePage;
