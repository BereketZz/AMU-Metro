import React, { useContext, useState } from "react";
("use client");
import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants } from "../utils/motion";
import Navbar from "../components/Navbar";
import { footerVariants } from "../utils/motion";
import Footer from "../components/Footer";
import { socials } from "../constants";
import { AuthContext } from "../Context/AuthContext";
import Link from "next/link";
import MiniFooter from "../components/MiniFooter";

function Stations() {
  const { isDarkMode, toggleTheme } = useContext(AuthContext);
  return (
    <div className="  bg-gray-800  overflow-hidden">
      <div className=" flex justify-center   w-[100%]   ">
      <motion.div
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={` ${styles.xPaddings} ${
              isDarkMode ? "dark:bg-gray-900 w-full" : "bg-white w-full"
            } relative bg-white border-gray-200`}
          >
            {/* <div className={`${isDarkMode?"absolute w-[40%] inset-0 blackish-gradient-01":""}`} /> */}

            <div
              class={`   flex justify-between items-center mx-auto max-w-screen-xl p-4`}
            >
              <Link href="/" class="flex items-center">
                <h2
                  className={`font-extrabold text-[24px] leading-[30px] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  AMU
                </h2>
              </Link>
              <a
               
                href="#"
                className={`flex items-center p-2  rounded-lg ${
                  isDarkMode
                    ? " dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 "
                    : "text-black hover:shadow-lg"
                } group`}
              >
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
                    d={`${
                      isDarkMode
                        ? "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        : "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    }`}
                  />
                </svg>

                <span
                  onClick={() => console.log("heyyy!")}
                  class="flex-1 ml-3 whitespace-nowrap"
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
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
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src="/planet-08.png"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Yared Godne
                    </a>
                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      Metrologist
                    </p>
                    <p class="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {" "}
                Forecasting technology & innovation
              </h1>
            </header>
            <p class="lead text-gray-300">
              Weather forecasting technology has come a long way over the years,
              thanks to continuous innovation and advancements in meteorological
              data gathering methods. Accurate weather predictions are crucial
              for a wide range of applications, from agriculture and aviation to
              disaster management and daily planning. Meteorologists rely on a
              combination of tools and techniques to collect data from various
              weather stations and satellites, helping them make more precise
              forecasts. Here's an overview of how meteorological data is
              gathered from weather stations and some recent innovations in this
              field:
            </p>
            <br />
            <figure>
              <img src="/rain.jpg" alt="" />
            </figure>{" "}
            <br />
            <h2 className="text-white">1. Weather Stations:</h2>
            <p className="text-gray-300">
              Weather stations are the backbone of meteorological data
              collection. These stations are strategically placed across the
              globe, including remote and inaccessible areas, to provide
              comprehensive coverage. They typically consist of various
              instruments to measure atmospheric conditions:
            </p>
            <br />
            <ol className="text-gray-300">
              <li>
                <strong>Thermometers</strong>.These measure temperature.
              </li>
              <li>
                <strong>Barometers: </strong>. Used to determine atmospheric
                pressure.
              </li>
              <li>
                <strong>Hygrometers:</strong> Used to determine atmospheric
                pressure.
              </li>
              <li>
                <strong>Anemometers:</strong>. Record wind speed and direction.
              </li>
              <li>
                <strong>Rain Gauges:</strong>Collect precipitation data
              </li>
            </ol>{" "}
            <br />
            <p className="text-gray-300">
              Traditional weather stations rely on human operators to gather and
              record data manually. However, recent innovations have introduced
              automatic weather stations that can transmit data in real-time via
              satellite or cellular networks, improving the timeliness and
              accuracy of information.
            </p>
            <h2 className="text-white">2. Satellites:</h2>
            <p className="text-gray-300">
              {" "}
              Weather satellites play a pivotal role in collecting
              meteorological data from space. They provide a global view of
              weather patterns, helping meteorologists track storms, monitor
              cloud cover, and study climate changes. Some key technologies and
              innovations in satellite-based meteorological data collection
              include:
            </p>
            <ol className="text-gray-300">
              <li>
                <strong>Remote Sensing: </strong>Satellites equipped with
                sensors can capture data on temperature, humidity, cloud cover,
                and more. They can even detect various atmospheric phenomena
                like ozone levels and sea surface temperatures.
              </li>
              <li>
                <strong>Geostationary Satellites:</strong>These orbit at the
                same speed as the Earth's rotation, providing a constant view of
                a specific region. They are particularly useful for monitoring
                rapidly changing weather conditions, such as severe storms.
              </li>
              <li>
                <strong>Hygrometers:</strong> Used to determine atmospheric
                pressure.
              </li>
              <li>
                <strong>Polar Orbiting Satellites: </strong>These circle the
                Earth in a polar orbit, providing global coverage and collecting
                data on temperature, precipitation, and atmospheric composition.
              </li>
              <li>
                <strong>Rain Gauges:</strong>Collect precipitation data
              </li>
            </ol>{" "}
            <br />
            <h2 className="text-white">4. Weather Balloons:</h2>
            <p className="text-gray-300">
              Weather balloons equipped with instruments are launched into the
              atmosphere to collect data on temperature, humidity, and pressure
              at different altitudes. This information helps meteorologists
              create vertical profiles of the atmosphere, crucial for
              forecasting.
            </p>
            <br />
            <h2 className="text-white">5. Weather Forecast Models:</h2>
            <p className="text-gray-300">
              In recent years, advances in supercomputing and numerical modeling
              have revolutionized weather forecasting. These models process vast
              amounts of meteorological data from various sources, including
              satellites, weather stations, and balloons, to create detailed
              weather predictions. Innovations in data assimilation techniques
              and model physics have improved the accuracy and precision of
              forecasts.
            </p>
            <br />
            <h2 className="text-white">
              6. Machine Learning and Artificial Intelligence:
            </h2>
            <p className="text-gray-300">
              Meteorologists are increasingly turning to machine learning and
              artificial intelligence (AI) to enhance forecasting accuracy.
              These technologies can analyze vast datasets and identify patterns
              that may not be apparent through traditional methods, leading to
              more accurate predictions.
            </p>
            <br />
            <p className="text-gray-300">
              In conclusion, meteorological data gathering has seen remarkable
              innovations over the years, from manual observations to advanced
              satellite technology, radar systems, and computational modeling.
              These innovations have significantly improved our ability to
              predict weather patterns and provide timely information for
              various industries and public safety. With ongoing research and
              technological advancements, the accuracy and lead time of weather
              forecasts are expected to continue improving, helping us better
              prepare for the ever-changing weather conditions.
            </p>
            <section class="not-format"></section>
          </article>
        </div>
      </main>

      <aside
        aria-label="Related articles"
        class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div class="px-4 mx-auto max-w-screen-xl">
          <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <article class="max-w-xs">
              <a href="#">
                <img src="rain.jpg" class="mb-5 rounded-lg" alt="Image 1" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Forecasting technology & innovation</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">
                Forecasting technology & innovation
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img
                  src="/planet-07.png"
                  class="mb-5 rounded-lg"
                  alt="Image 2"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Enterprise design tips</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline"
              >
                Read in 12 minutes
              </a>
            </article>

            <article class="max-w-xs">
              <a href="#">
                <img
                  src="planet-02.png"
                  class="mb-5 rounded-lg"
                  alt="Image 4"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p class="mb-4 font-light text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-gray-300 hover:no-underline"
              >
                Read in 4 minutes
              </a>
            </article>
          </div>
        </div>
      </aside>
      <MiniFooter />
    </div>
  );
}

export default Stations;

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
