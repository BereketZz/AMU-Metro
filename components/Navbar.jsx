"use client";
import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants } from "../utils/motion";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { currentUser, isDarkMode, toggleTheme, setIsDarkMode } =
    useContext(AuthContext);

  const nop = () => {
    console.log("this is from Nav", isDarkMode);
  };
  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-5  relative ${
        isDarkMode ? "" : "shadow-lg"
      }`}
    >
      <div
        className={`${
          isDarkMode ? "absolute w-[30%] inset-0 blackish-gradient-01" : ""
        }`}
      />
      <div
        className={`${styles.innerWidth} items-center mx-auto flex justify-between gap-8`}
      >
        <h2
          className={`font-extrabold text-[24px] leading-[30px] ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          AMU
        </h2>

       

        <Link
          href={`/${currentUser ? "admin-dash" : "login"}`}
          type="button"
          className={`flex items-center px-6 py-2 bg-green-900 rounded-lg group`}
        >
          <span className="font-normal text-[16px] text-white">
            {currentUser ? (
              <p className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </p>
            ) : (
              "Sign In"
            )}
          </span>
        </Link>
      </div>
    </motion.div>
  );
};
export default Navbar;
