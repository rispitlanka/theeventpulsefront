"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/navBar";

function Verification() {
  const [timer, setTimer] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimer(60);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
      setCurrentIndex(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
      setCurrentIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
      setCurrentIndex(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
      setCurrentIndex(index - 1);
    }
  };

  const handleFocus = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md lg:w-1/3 lg:container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Verification Code</h2>
          <p className="text-gray-600 mx-4 mb-10">
            Enter the verification code sent to your email. Didn't receive a
            code? Resend.
          </p>
          <form>
            <div className="flex justify-center mb-10 space-x-2 sm:space-x-4">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className={`shadow appearance-none border rounded w-10 h-10 sm:w-12 sm:h-12 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      currentIndex === index
                        ? "border-purple-700 bg-slate-200 "
                        : "border-black"
                    }`}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    required
                  />
                ))}
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-3 rounded w-full sm:w-1/2 xl:w-1/3"
            >
              <Link href="/login/forgot-password/verification/reset-password">
                Confirm
              </Link>
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            If you didn't get OTP?{" "}
            <button
              className={`text-purple-500 ${
                timer > 0 ? "cursor-not-allowed" : ""
              }`}
              onClick={handleResend}
              disabled={timer > 0}
            >
              Resend ({formatTime(timer)})
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verification;
