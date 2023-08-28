'use client';
import { motion } from "framer-motion";
import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { ExploreCard, TitleText } from "../components";
import {exploreWorlds} from '../constants'
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Explore = () => {
  const[active, setActive]= useState('world-2')
  const{ isDarkMode, toggleTheme}= useContext(AuthContext)
  
  return(
  <section className={`${styles.paddings}`} id="expore">
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{once:false, amount:0.25}}
    className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <p className={`font-extrabold text-center ${isDarkMode?"text-white":"text-gray-700"} sm:text-[40px] text-[20px]`}>Explore our Service here</p>
      <div className=" mt-[50px] flex  lg:flex-row flex-col min-h-[70vh] gap-5 ">
     {
      exploreWorlds.map((world, index)=> (<ExploreCard
        key={world.id}
        {...world}
        index={index}
        active={active}
        handleClick={setActive}
        
        />))
     }
      </div>

    </motion.div>
   
  </section>
)};

export default Explore;
