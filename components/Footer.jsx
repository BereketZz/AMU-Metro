'use client';
import { motion } from "framer-motion";
import styles from "../styles";
import { footerVariants } from "../utils/motion";
import { socials } from '../constants';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const Footer = () => {
  const{ isDarkMode, toggleTheme}= useContext(AuthContext)
  return(
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className={`${isDarkMode?"absolute w-[50%] inset-0 blackish-gradient-01":""}`} />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className={`font-bold md:text-[64px] text-[44px] ${isDarkMode?"text-white":"text-gray-700"}`}>
        AMU
        </h4>
        <button type="button" className="flex items-center h-fit py-4 px-6 bg-green-900 rounded-[32px] gap-[12px]">
         
          <span className="font-normal text-[16px] text-white">
           Get Started
          </span>
          <img
            src="/arrow.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>
      </div>

      <div className="flex flex-col">
        <div className={`mb-[50px] h-[2px] ${isDarkMode?"bg-white":"bg-gray-700"} opacity-10`} />

        <div className="flex items-center justify-center flex-wrap gap-10">
        
          <p className={`font-normal text-[14px] ${isDarkMode?"text-white":"text-black"} opacity-50`}>
            Copyright © 2023 - AMU. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
)};

export default Footer;
