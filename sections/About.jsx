'use client';
import { motion } from "framer-motion";
import { TypingText } from "../components";
import styles from "../styles"
import {fadeIn , staggerContainer, textVariant} from '../utils/motion'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const About = () => {
  const{ isDarkMode, toggleTheme}= useContext(AuthContext)
  return(
  <section className={`${styles.paddings} relative z-10`} id="About">
    <div className=" blackish-gradient-03" />
   <motion.div
   variants={staggerContainer}
   initial="hidden"
   whileInView="show"
   viewport={{once:false, amount:0.25}}
   className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col `}
   >
     
   <motion.div variants={textVariant(1.1)} className={` sm:w-[80%] w-[100%] ${isDarkMode?"text-gray-300":"text-gray-700"}  sm:text-[22px] text-[18px]`}>
   | <span className="font-extrabold text-[22px]">R</span>  evolutionizing meteorology at Arbaminch University! Our platform combines station data, powerful research tools, and AI models for real-time weather insights, supercharging meteorologists and researchers with precision and predictive prowess.
   </motion.div>
   <motion.img
   variants={fadeIn('up', 'tween',0.3,1)}
   src="/arrow-down.svg"
   className="w-[18px] h-[28px] object-contain mt-[28px] sm:mt-[60px] mt-[20px]"
   />
    
   
    
   </motion.div>
  </section>
)};

export default About;
