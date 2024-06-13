import Navbar from "@/app/components/navBar";
import Link from "next/link";
import React from "react";

function Payment() {
  return (
    <div className=" bg-gray-100">
      <Navbar />

      <div className="mt-20 pl-20">
        <Link href={`/movies/id/seats/payment/success`} passHref>
          <button className="bg-blue-600 text-lg text-white">Payment</button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
