'use client';
import { motion } from "framer-motion";
import styles from "../styles"
import {fadeIn, planetVariants, slideIn, staggerContainer, textVariant} from '../utils/motion'
import { startingFeatures } from "../constants";
import { StartSteps } from "../components";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const GetStarted = () => {
  const{ isDarkMode, toggleTheme}= useContext(AuthContext)

  return(
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{once:'false', amount:0.25}}
    className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    
    >
      <motion.div
      variants={planetVariants('left')}
      className={`flex-1 ${styles.flexCenter}`}
      >
        <img
        src="/umbrella.png"
        className="w-[90%] h-[90%] object-contain" />

      </motion.div>
      <motion.div
      variants={fadeIn('left', 'tween',0.2,1)}
      className="flex-[0.75] flex justify-center flex-col"
      >
              <p className={`font-extrabold text-center ${isDarkMode?"text-white":"text-gray-700"} sm:text-[40px] text-[20px]`}>Get started with just a few clicks</p>
              <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
                {
                  startingFeatures.map((feature,index)=> (
                    <StartSteps
                    key={feature}
                    number={index+1}
                    text={feature}
                    dark={isDarkMode}
                    />
                  ))
                }
              </div>

      </motion.div>

    </motion.div>
 
  </section>
)};

export default GetStarted;
