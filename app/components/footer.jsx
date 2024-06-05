// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10  pb-4">
      <div className="container mx-auto px-4">
        {/* Locations Section */}
        <div className="md:flex md:justify-between mb-6 pb-5 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2 md:mb-0">
            Locations now issuing:
          </h2>
          <p className="text-sm font-poppins">
            Jaffna | Colombo | Kilinochchi | Mannar | Vavuniya | Trincomalee |
            Batticolo | Hatton | Nuwaraliya | Elle | Galle | Hambanthota | Kandy
            | Dambulla | Chennai | Vietnam | Negombo
          </p>
        </div>

        {/* Grid Container for About, Quick Links, and Subscription Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="flex flex-col w-full md:w-1/2  items-center  md:items-center ">
            <div className="bg-gray-700 w-1/2 items-center md:w-full h-24 mb-4"></div>
            <p className="text-sm text-center md:text-left">
              A small text about us with 2 or 3 sentences. A small text about us
              with 2 or 3 sentences. A small text about us with 2 or 3
              sentences.
            </p>
            <div className="flex space-x-8 mt-4">
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.294V11.29h3.526V8.41c0-3.498 2.134-5.404 5.245-5.404 1.49 0 2.772.112 3.145.162v3.65h-2.16c-1.693 0-2.021.806-2.021 1.988v2.61h4.042l-.527 4.415h-3.515V24h6.889C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 15 2 C 7.832 2 2 7.832 2 15 C 2 22.168 7.832 28 15 28 C 22.168 28 28 22.168 28 15 C 28 7.832 22.168 2 15 2 z M 11.666016 6 L 18.332031 6 C 21.457031 6 24 8.5420156 24 11.666016 L 24 18.332031 C 24 21.457031 21.457984 24 18.333984 24 L 11.667969 24 C 8.5429688 24 6 21.457984 6 18.333984 L 6 11.667969 C 6 8.5429688 8.5420156 6 11.666016 6 z M 11.666016 8 C 9.6450156 8 8 9.6459688 8 11.667969 L 8 18.333984 C 8 20.354984 9.6459688 22 11.667969 22 L 18.333984 22 C 20.354984 22 22 20.354031 22 18.332031 L 22 11.666016 C 22 9.6450156 20.354031 8 18.332031 8 L 11.666016 8 z M 19.667969 9.6660156 C 20.035969 9.6660156 20.333984 9.9640312 20.333984 10.332031 C 20.333984 10.700031 20.035969 11 19.667969 11 C 19.299969 11 19 10.700031 19 10.332031 C 19 9.9640312 19.299969 9.6660156 19.667969 9.6660156 z M 15 10 C 17.757 10 20 12.243 20 15 C 20 17.757 17.757 20 15 20 C 12.243 20 10 17.757 10 15 C 10 12.243 12.243 10 15 10 z M 15 12 A 3 3 0 0 0 15 18 A 3 3 0 0 0 15 12 z" />
                </svg>
              </a>

              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0zM7.19 20.16H3.6V9h3.59v11.16zM5.39 7.43c-1.16 0-2.1-.94-2.1-2.1s.94-2.1 2.1-2.1 2.1.94 2.1 2.1-.94 2.1-2.1 2.1zm14.77 12.73h-3.59V14.8c0-1.28-.03-2.93-1.79-2.93-1.79 0-2.06 1.39-2.06 2.82v5.47h-3.59V9h3.44v1.52h.05c.48-.91 1.64-1.87 3.38-1.87 3.62 0 4.29 2.38 4.29 5.47v6.55z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start mb-2 md:mb-0">
            <h2 className="text-xl font-semibold mb-0 md:mb-4">Quick Links</h2>
            <ul className="text-sm space-y-2 text-center md:text-left">
              <li>
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Request a Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an ambassador
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Custom Booking
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
              Join with us to get to know about the promotions
            </h2>
            <form className="flex w-full max-w-md">
              <div className="flex-grow relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="#000000"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"
                        fill-rule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="youremail123@gmail.com"
                  className="pl-10 pr-4 py-2 rounded-l-full focus:outline-none text-black w-full"
                />
              </div>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-r-full hover:bg-purple-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-white"></hr>
      {/* Footer Note */}
      <div className="md:text-right text-center ">
        <p className="text-sm">
          A product of Rispit | Made in Jaffna with{" "}
          <span className="text-red-500">❤</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
