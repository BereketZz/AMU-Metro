'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../styles"
import {fadeIn} from '../utils/motion'

const ExploreCard = ({id,url, imgUrl, title,index, active, handleClick }) => (
  <motion.div
  variants={fadeIn('right', 'spring', index*0.5, 0.75)}
  className={`relative ${active==id? 'lg:flex-[1] flex-[10]':'lg:flex-[0.5] flex-[2]'} flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer `}
  onClick={()=>handleClick(id)}
  >
   <img src={imgUrl}
   className="absolute w-full border border-gray-600  shadow rounded-lg h-full object-fit rounded-[24px]" />
   <div className=" rounded-[24px] h-full w-full font-semibold sm:text-[26px] text-[18px] text-white absolute z-0   "> 
   <div className="flex justify-around">
   <h3 className=" text-white z-0 ml-[15px] mt-[15px]">{title}</h3>
   <Link href={`${url}`} className= {`${active==id? 'block':'hidden'} flex   z-0 ml-[50px] mt-[15px]`}>Visit &nbsp;<img src="/arrow.svg" className="w-[24px] " /></Link>
   </div>
  
   
   </div>
    
  </motion.div>
);

export default ExploreCard;
//bg-primary-black opacity-50 