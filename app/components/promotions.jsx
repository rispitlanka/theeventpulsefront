import React from "react";
import Image from "next/image";
import promotion1 from "../../public/assets/images/promotion1.png";
import promotion2 from "../../public/assets/images/promotion2.png";
import promotion3 from "../../public/assets/images/promotion3.png";
import promotion4 from "../../public/assets/images/promotion4.png";

export const Promotions = () => {
  const promotionData = [
    {
      img: promotion1,
      name: "Buy one get one Free",
      type: "Gift with purchase",
      location: "",
      deadline: "until 05th May 2025",
    },
    {
      img: promotion2,
      name: "Free Popcorn and Snacks",
      type: "Promotions",
      location: "at Raja Theater",
      deadline: "until 05th May 2025",
    },
    {
      img: promotion3,
      name: "Indian Special tickets",
      type: "Promotions",
      location: "",
      deadline: "until 05th May 2025",
    },
    {
      img: promotion4,
      name: "50% off on Weekdays",
      type: "Gift with purchase",
      location: "",
      deadline: "until 05th May 2025",
    },
  ];

  return (
    <div className="bg-gray-900 w-full py-2 md:py-8">
      <div className="max-w-7xl mx-auto py-10 mb-0 md:mb-10 px-4 sm:px-2 lg:px-4">
        <div className="flex justify-between mb-6 px-2">
          <div>
            <h2 className=" text-sm md:text-3xl font-bold text-white p-2">
              Promotions You don&apos;t want to miss
            </h2>
          </div>
          <div className="mr-0 md:mr-10 ">
            <button className="text-gray-200 text-xs md:text-xl ">
              View All Promotions
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {promotionData.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 flex mb-4 p-2"
            >
              <div className="flex-shrink-0 w-1/3 ">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="rounded-lg "
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="ml-4 flex flex-col w-1/2 justify-center">
                <span
                  className={`inline-block ${
                    item.type === "Promotions" ? "bg-blue-700" : "bg-red-500"
                  } text-white text-xs md:text-sm px-2 py-1  rounded-full mb-2`}
                >
                  <div className="ml-3"> {item.type}</div>
                </span>
                <h3 className="text-xs md:text-3xl font-semibold text-white">
                  {item.name}
                </h3>

                {item.location ? (
                  <p className="text-gray-400 text-xs">
                    {item.location}-{item.deadline}
                  </p>
                ) : (
                  <p className="text-gray-400 text-xs">{item.deadline}</p>
                )}
                <button className="bg-purple-600 text-white font-bold w-1/2 md:w-1/2 text-xs md:text-lg py-2 md:py-3 rounded hover:bg-purple-700">
                  View Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
