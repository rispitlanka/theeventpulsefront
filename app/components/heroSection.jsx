"use client";

import React from "react";

import Image from "next/image";
import goat from "../../public/assets/images/goat.png";
import indian2 from "../../public/assets/images/indian2.png";
import micheal from "../../public/assets/images/micheal.png";
import indiann2 from "../../public/assets/images/indiann2.png";
import dhanush50 from "../../public/assets/images/dhanush50.png";
import maposi from "../../public/assets/images/maposi.png";
import raayan from "../../public/assets/images/raayan.png";
import kubera from "../../public/assets/images/kubera.png";
import maharaja from "../../public/assets/images/maharaja.png";
import pathuThala from "../../public/assets/images/pathuThala.png";
import kanguva from "../../public/assets/images/kanguva.png";
import micheall from "../../public/assets/images/micheall.png";

export default function HeroSection() {
  const itemData = [
    {
      img: goat,
      title: "Goat",
      author: "GOAT",
    },
    {
      img: indian2,
      title: "Indian 2",
      author: "Indian 2",
    },
    {
      img: indiann2,
      title: "Indian 2",
      author: "Indian 2",
    },
    {
      img: micheal,
      title: "Micheal",
      author: "Micheal",
    },
    {
      img: dhanush50,
      title: "Dhanush 50",
      author: "Dhanush 50",
    },
    {
      img: maposi,
      title: "Ma Po Si",
      author: "Ma Po Si",
    },
    {
      img: raayan,
      title: "Raayan",
      author: "Raayan",
    },
    {
      img: kubera,
      title: "Kubera",
      author: "Kubera",
    },
    {
      img: maharaja,
      title: "Maharaja",
      author: "Maharaja",
    },
    {
      img: pathuThala,
      title: "Pathu Thala",
      author: "Pathu Thala",
    },
    {
      img: kanguva,
      title: "Kanguva",
      author: "Kanguva",
    },
    {
      img: micheall,
      title: "Micheal",
      author: "Micheal",
    },
  ];
  return (
    <div className=" mt-2 font-poppins">
      <div className=" mx-auto pt-12 ">
        <div
          className="grid grid-cols-2 overflow-hidden"
          style={{ height: "90vh !important" }}
        >
          <div
            className="justify-center items-top flex items-center "
            style={{ height: "90vh !important" }}
          >
            <div className="px-10">
              <div className="m-10 px-10">
                <h1 className="text-sm md:text-4xl w-full font-bold leading-snug mb-4">
                  Looking for Your Next Favorite Movie?
                </h1>
                <p className="text-xs md:text-xl leading-relaxed mb-6">
                  Effortlessly book movie seats from hundreds of theaters. Your
                  perfect cinema experience is just a few clicks away!
                </p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-sm md:text-lg hover:bg-purple-700 transition duration-300 ease-in-out">
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/4 animate-moveUp pr-5">
              <Image src={itemData[0].img} alt="Film" className="pb-5" />
              <Image src={itemData[1].img} alt="Film" className="pb-5" />
              <Image src={itemData[2].img} alt="Film" className="pb-5" />
              <Image src={itemData[3].img} alt="Film" className="pb-5" />
            </div>
            <div className="w-1/4 animate-moveDown pr-5">
              <Image src={itemData[4].img} alt="Film" className="pb-5" />
              <Image src={itemData[5].img} alt="Film" className="pb-5" />
              <Image src={itemData[6].img} alt="Film" className="pb-5" />
              <Image src={itemData[7].img} alt="Film" className="pb-5" />
            </div>
            <div className="w-1/4 animate-moveUp pr-5">
              <Image src={itemData[8].img} alt="Film" className="pb-5" />
              <Image src={itemData[9].img} alt="Film" className="pb-5" />
              <Image src={itemData[10].img} alt="Film" className="pb-5" />
              <Image src={itemData[11].img} alt="Film" className="pb-5" />
            </div>
            <div className="w-1/4 animate-moveDown pr-5">
              <Image src={itemData[0].img} alt="Film" className="pb-5" />
              <Image src={itemData[1].img} alt="Film" className="pb-5" />
              <Image src={itemData[2].img} alt="Film" className="pb-5" />
              <Image src={itemData[3].img} alt="Film" className="pb-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
