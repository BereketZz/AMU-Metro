import React from 'react'
'use client';
import { motion } from "framer-motion";
import styles from "../styles"
import {navVariants} from '../utils/motion'
import Navbar from "../components/Navbar";
import { footerVariants } from "../utils/motion";
import Footer from "../components/Footer";
import { socials } from '../constants';

function Stations() {
  return (
    <div className="bg-primary-black overflow-hidden">
         <br/><br/>
       <div className="w-full  text-white flex justify-center items-center flex-col" >
       <h2 className=" md:w-[50%] w-[80%] font-extrabold text-[24px] leading-[30px] text-white">Exploring the Advanced Tools Utilized by Meteorologists  to Enhance Weather <br className='sm:block hidden'/> Forecasting Accuracy</h2> <br/>
       <div className='flex mt-[10px]   justify-between md:w-[50%] w-[80%]'><p class="    font-normal text-gray-700 dark:text-gray-400"> Focus areas:
Weather
Topics:
forecasting
technology & innovation
</p>   <div className="flex gap-4">
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
       <hr class=" md:w-[50%] w-[80%] h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
<div className=' md:w-[50%] w-[80%] '> <br/>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white"> 1. Automated surface-observing systems
</h5>
<img src="/metro1.jpg" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
<p class="font-normal text-gray-700 dark:text-gray-400">ASOS (automated surface observing systems) constantly monitor weather conditions on the Earth’s surface. More than 900 stations across the U.S. report data about sky conditions, surface visibility, precipitation, temperature and wind up to 12 times an hour. Nearly 10,000 volunteer NWS Cooperative Observers collect and provide us additional temperature, snowfall and rainfall data. The observational data our ASOS and volunteers collect are essential for improving forecasts and warnings.
Learn more about ASOS</p> 
</div>
<div className='md:w-[50%] w-[80%]'> <br/>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white"> 2. Satellite data
</h5>
<img src="/satelit.png" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
<p class="font-normal text-gray-700 dark:text-gray-400">Weather Satellites monitor Earth from space, collecting observational data our scientists analyze. NOAA operates three types of weather satellites. Polar orbiting satellites orbit the Earth close to the surface, taking six or seven detailed images a day. Geostationary satellites stay over the same location on Earth high above the surface taking images of the entire Earth as frequently as every 30 seconds. Deep space satellites face the sun to monitor powerful solar storms and space weather. NOAA also uses data from satellites operated by other agencies and countries.
Learn more about NOAA’s weather satellites</p> 
</div>
<div className='md:w-[50%] w-[80%]'> <br/>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">3. Doppler radar </h5>
<img src="/dopler.jpg" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
<p class="font-normal text-gray-700 dark:text-gray-400">Doppler Radar is the meteorologist’s window into observing severe storms. With 159 radar towers across the United States, NOAA’s National Weather Service has comprehensive coverage of the continental U.S. and partial coverage of Alaska, Hawaii, Puerto Rico and Guam. Doppler radar detects all types of precipitation, the rotation of thunderstorm clouds, airborne tornado debris, and wind strength and direction.</p> 
</div>

      
       </div> <br/><br/>
  <Footer/>
   </div>
  )
}

export default Stations