import React, {useContext, useState} from 'react'
'use client';
import { motion } from "framer-motion";
import styles from "../styles"
import {navVariants} from '../utils/motion'
import Navbar from "../components/Navbar";
import { footerVariants } from "../utils/motion";
import Footer from "../components/Footer";
import { socials } from '../constants';
import { AuthContext } from '../Context/AuthContext';
import Link from 'next/link';

function Stations() {
const {isDarkMode, toggleTheme}= useContext(AuthContext)
  return (

    <div className='  bg-gray-800 max-w-[100%] overflow-hidden'>
        <div className=' flex justify-center  w-[100%]   '>
        <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} ${isDarkMode?"dark:bg-gray-900 w-[60%] ":"bg-white"} relative bg-white border-gray-200`}
        >
    <div class={`flex justify-between items-center mx-auto max-w-screen-xl p-4`}>
        <Link href="/" class="flex items-center">
        <h2 className={`font-extrabold text-[24px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>AMU</h2>
            
        </Link>
        <a onClick={toggleTheme} href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d={`${isDarkMode?"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z":"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"}`} />
</svg>

               <span onClick={()=>console.log("heyyy!")} class="flex-1 ml-3 whitespace-nowrap">{isDarkMode?"Light Mode":"Dark Mode"}</span>
               
            </a>
        
    </div>
</motion.div>
        </div>
     

<main class="pt-8 pb-16 lg:pt-16 lg:pb-24  bg-gray-800  ">
  <div class="  flex justify-between px-4 mx-auto max-w-screen-xl  ">
      <article class=" mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert  w-[100%] ">
          <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                  <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img class="mr-4 w-16 h-16 rounded-full" src="/planet-08.png" alt="Jese Leos" />
                      <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">Yared Godne</a>
                          <p class="text-base font-light text-gray-500 dark:text-gray-400">Metrologist</p>
                          <p class="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                      </div>
                  </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"> Forecasting
 technology & innovation</h1>
          </header>
          <p class="lead text-gray-300">Weather forecasting technology has come a long way over the years, thanks to continuous innovation and advancements in meteorological data gathering methods. Accurate weather predictions are crucial for a wide range of applications, from agriculture and aviation to disaster management and daily planning. Meteorologists rely on a combination of tools and techniques to collect data from various weather stations and satellites, helping them make more precise forecasts. Here's an overview of how meteorological data is gathered from weather stations and some recent innovations in this field:</p>
       <br/>
          <figure><img src="/rain.jpg" alt="" />
              
          </figure> <br/>
          <h2 className='text-white'>1. Weather Stations:</h2>
          <p className='text-gray-300'>Weather stations are the backbone of meteorological data collection. These stations are strategically placed across the globe, including remote and inaccessible areas, to provide comprehensive coverage. They typically consist of various instruments to measure atmospheric conditions:</p>
         <br/>
              <ol className='text-gray-300'>
              <li><strong>Thermometers</strong>.These measure temperature.
              </li>
              <li><strong>Barometers: </strong>. Used to determine atmospheric pressure.
                  </li>
              <li><strong>Hygrometers:</strong> Used to determine atmospheric pressure.</li>
              <li><strong>Anemometers:</strong>. Record wind speed and direction.
              </li>
              <li><strong>Rain Gauges:</strong>Collect precipitation data
              </li>
          </ol> <br/>
          <p className='text-gray-300'>Traditional weather stations rely on human operators to gather and record data manually. However, recent innovations have introduced automatic weather stations that can transmit data in real-time via satellite or cellular networks, improving the timeliness and accuracy of information.</p>
          <h2 className='text-white'>2. Satellites:</h2>
          <p className='text-gray-300'> Weather satellites play a pivotal role in collecting meteorological data from space. They provide a global view of weather patterns, helping meteorologists track storms, monitor cloud cover, and study climate changes. Some key technologies and innovations in satellite-based meteorological data collection include:</p>
        
              <ol className='text-gray-300'>
              <li><strong>Remote Sensing: </strong>Satellites equipped with sensors can capture data on temperature, humidity, cloud cover, and more. They can even detect various atmospheric phenomena like ozone levels and sea surface temperatures.
              </li>
              <li><strong>Geostationary Satellites:</strong>These orbit at the same speed as the Earth's rotation, providing a constant view of a specific region. They are particularly useful for monitoring rapidly changing weather conditions, such as severe storms.
                  </li>
              <li><strong>Hygrometers:</strong> Used to determine atmospheric pressure.</li>
              <li><strong>Polar Orbiting Satellites: </strong>These circle the Earth in a polar orbit, providing global coverage and collecting data on temperature, precipitation, and atmospheric composition.
              </li>
              <li><strong>Rain Gauges:</strong>Collect precipitation data
              </li>
          </ol> <br/>
          <h2 className='text-white'>4. Weather Balloons:</h2>
          <p className='text-gray-300'>Weather balloons equipped with instruments are launched into the atmosphere to collect data on temperature, humidity, and pressure at different altitudes. This information helps meteorologists create vertical profiles of the atmosphere, crucial for forecasting.</p>
          <br/>
          <h2 className='text-white'>5. Weather Forecast Models:</h2>

          <p className='text-gray-300'>In recent years, advances in supercomputing and numerical modeling have revolutionized weather forecasting. These models process vast amounts of meteorological data from various sources, including satellites, weather stations, and balloons, to create detailed weather predictions. Innovations in data assimilation techniques and model physics have improved the accuracy and precision of forecasts.</p>
          <br/>
          <h2 className='text-white'>6. Machine Learning and Artificial Intelligence:</h2>
          <p  className='text-gray-300'>Meteorologists are increasingly turning to machine learning and artificial intelligence (AI) to enhance forecasting accuracy. These technologies can analyze vast datasets and identify patterns that may not be apparent through traditional methods, leading to more accurate predictions.</p>
          <br />
          <p className='text-gray-300'>
          In conclusion, meteorological data gathering has seen remarkable innovations over the years, from manual observations to advanced satellite technology, radar systems, and computational modeling. These innovations have significantly improved our ability to predict weather patterns and provide timely information for various industries and public safety. With ongoing research and technological advancements, the accuracy and lead time of weather forecasts are expected to continue improving, helping us better prepare for the ever-changing weather conditions.
          </p>
          
         
         
    
       
          <section class="not-format">
           
        
              
     
          </section>
      </article>
  </div>
</main>

<aside aria-label="Related articles" class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
  <div class="px-4 mx-auto max-w-screen-xl">
      <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <article class="max-w-xs">
              <a href="#">
                  <img src="rain.jpg" class="mb-5 rounded-lg" alt="Image 1"/>
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">Forecasting technology & innovation</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">Forecasting technology & innovation</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline">
                  Read in 2 minutes
              </a>
          </article>
          <article class="max-w-xs">
              <a href="#">
                  <img src="/planet-07.png" class="mb-5 rounded-lg" alt="Image 2"/>
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">Enterprise design tips</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline">
                  Read in 12 minutes
              </a>
          </article>
        
          <article class="max-w-xs">
              <a href="#">
                  <img src="planet-02.png" class="mb-5 rounded-lg" alt="Image 4" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">Our first project with React</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline">
                  Read in 4 minutes
              </a>
          </article>
      </div>
  </div>
</aside>



<footer class="bg-gray-50 dark:bg-gray-800">
  <div class="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class=" hover:underline">About</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Explore</a>
                  </li>
               
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Blog</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Sign In</a>
                  </li>
              </ul>
          </div>
          
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Privacy Policy</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Licensing</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Terms</a>
                  </li>
              </ul>
          </div>
         
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Research</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Station Data</a>
                  </li>
                  
              </ul>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
      <div class="text-center">
          <a href="#" class="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
       
              AMU
          </a>
          <span class="block text-sm text-center text-gray-500 dark:text-gray-400">©2023 <a href="#" class="hover:underline">AMU</a>. All Rights Reserved.
          </span>
          <ul class="flex justify-center mt-5 space-x-5">
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
          </ul>
      </div>
  </div>
</footer>
    
    
    
    </div>
  
  )
}

export default Stations

/**

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
//               <img
//                 key={social.name}
//                 src={social.url}
//                 alt={social.name}
//                 className="w-[24px] h-[24px] object-contain cursor-pointer"
//               />
//             ))}
//           </div>
//           </div>
//        <hr class=" md:w-[50%] w-[80%] h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
// <div className=' md:w-[50%] w-[80%] '> <br/>
// <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white"> 1. Automated surface-observing systems
// </h5>
// <img src="/metro1.jpg" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
// <p class="font-normal text-gray-700 dark:text-gray-400">ASOS (automated surface observing systems) constantly monitor weather conditions on the Earth’s surface. More than 900 stations across the U.S. report data about sky conditions, surface visibility, precipitation, temperature and wind up to 12 times an hour. Nearly 10,000 volunteer NWS Cooperative Observers collect and provide us additional temperature, snowfall and rainfall data. The observational data our ASOS and volunteers collect are essential for improving forecasts and warnings.
// Learn more about ASOS</p> 
// </div>
// <div className='md:w-[50%] w-[80%]'> <br/>
// <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white"> 2. Satellite data
// </h5>
// <img src="/satelit.png" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
// <p class="font-normal text-gray-700 dark:text-gray-400">Weather Satellites monitor Earth from space, collecting observational data our scientists analyze. NOAA operates three types of weather satellites. Polar orbiting satellites orbit the Earth close to the surface, taking six or seven detailed images a day. Geostationary satellites stay over the same location on Earth high above the surface taking images of the entire Earth as frequently as every 30 seconds. Deep space satellites face the sun to monitor powerful solar storms and space weather. NOAA also uses data from satellites operated by other agencies and countries.
// Learn more about NOAA’s weather satellites</p> 
// </div>
// <div className='md:w-[50%] w-[80%]'> <br/>
// <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">3. Doppler radar </h5>
// <img src="/dopler.jpg" className='w-full sm:h-[300px] h-[200px]  sm:rounded-[24px] rounded-[10px]' /> <br/>
// <p class="font-normal text-gray-700 dark:text-gray-400">Doppler Radar is the meteorologist’s window into observing severe storms. With 159 radar towers across the United States, NOAA’s National Weather Service has comprehensive coverage of the continental U.S. and partial coverage of Alaska, Hawaii, Puerto Rico and Guam. Doppler radar detects all types of precipitation, the rotation of thunderstorm clouds, airborne tornado debris, and wind strength and direction.</p> 
// </div>

      
//        </div> <br/><br/>
//   <Footer/>
//    </div>


 */