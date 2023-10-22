import React,{useEffect, useState, useContext} from 'react'
import * as tf from '@tensorflow/tfjs';
import { navVariants, staggerContainer } from '../utils/motion';
import { AuthContext } from '../Context/AuthContext';
import { motion } from 'framer-motion';
import styles from '../styles';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faMugHot , } from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analysis() {
const{isDarkMode, toggleTheme}= useContext(AuthContext)  
const [final, setFinal]= useState()
const[inp, setInp]= useState({
  temp:"",
  solar:"",
  hum:""
})
const [gum, setGum]= useState(false)

useEffect(()=>{
 setGum(true)
})
//15 20  25 30 35 23 32
const data = [
  {
    name: '2016',
    Ave_Temprature: 22.8,
  },
  {
    name: '2017',
    Ave_Temprature: 23.5,
  },
  {
    name: '2018',
    Ave_Temprature: 23.2,
  },
  {
    name: '2019',
    Ave_Temprature: 24.2,
  },
  {
    name: '2020',
    Ave_Temprature: 22.9,
  },
  {
    name: '2021',
    Ave_Temprature: 23.2,
  },
  {
    name: '2022',
    Ave_Temprature: 23.9,
  },
];
const[total, setTotal]=useState([])

   const loader= async(event)=>{
    event.preventDefault()
   const model= await tf.loadLayersModel('/model.json')
   const predictions= model.predict(tf.tensor2d([floatArray]))
   const predictionsArray = await predictions.array();
   setFinal(predictionsArray)
     }
     const handleChange= (e)=>{
      setInp((prev)=>{
          return{
              ...prev,
             [e.target.name]:e.target.value
          }
      })
  }
  const convertedArray = Object.values(inp)
  const floatArray = convertedArray.map((stringValue) => parseFloat(stringValue));
 
 
    //console.log("the data "+final)
  return (
    <div>
    {/* <button onClick={loader}>Click</button>
    <button >Boom</button>
    <input type="text" name="temp" onChange={handleChange} />
    <input type="text" name="solar" onChange={handleChange}/>
    <input type="text"  name="hum" onChange={handleChange} />
    
    <button onClick={()=>setFinal(null)}>Off</button>
    <p>{final?final:"Hello"}</p> */}
         <motion.div
    variants={staggerContainer}
   initial="hidden"
   whileInView="show"
   viewport={{once:false, amount:0.25}}
    className={`${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden w-screen  flex justify-center`}>
       <div className='sm:w-[70%] w-[90%] flex flex-col   '>

       <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} ${isDarkMode?"dark:bg-gray-900":"bg-white"} relative bg-white border-gray-200`}
        >
          {/* <div className={`${isDarkMode?"absolute w-[40%] inset-0 blackish-gradient-01":""}`} /> */}

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
<p className={`font-extrabold  ${isDarkMode?"text-white":"text-gray-700"} sm:text-[40px] text-[20px]`}>Unlocking Meteorological Insights: A Comprehensive Analysis of  Weather  Statistics and Trends</p>
<p className='text-gray-300 text-[18px] mt-[10px] '>
Delve into the dynamic world of meteorological data as we present a visual journey through the average temperature trends spanning seven impactful years from 2016 to 2022. This meticulously crafted chart captures the annual fluctuations in temperature, offering a compelling insight into our planet's changing climate.

Explore the ebb and flow of temperatures, from the warmth of summer to the chill of winter, as we chart the course of nature's annual rhythms. Witness the intriguing patterns that emerge, reflecting the interplay of various climatic factors and natural phenomena.
</p>
<div className='flex justify-center'> 
<br/>

{gum && <BarChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 45,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" stroke='gray-700' />
          <Bar dataKey="Ave_Temprature" fill="green" background={{ fill: '#eee' }} />
        </BarChart>}


</div>
<p className={`font-bold  ${isDarkMode?"text-white":"text-gray-700"} sm:text-[25px] text-[20px]`}>Exploring Multi-Faceted Meteorological Trends (2016-2022)</p>
<p className='text-gray-300 text-[18px] mt-[10px] '>
Intrigued by the forces that shape our world's climate? Join us on an illuminating journey through the numerical tapestry of meteorological data spanning the past seven years, from 2016 to 2022. Our comprehensive analysis presents a trio of key metrics: average wind speed, solar radiation, and soil temperature.
Discover the subtleties of wind dynamics, solar energy patterns, and soil thermal behavior, all expressed in clear, numeric values. These multi-dimensional statistics reveal the intricate interplay between these essential meteorological elements and provide valuable insights into the evolving climate.
</p> 

<div className=' mt-[30px] grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Wind Speed</p> 
<img src="/speed1.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>0.7</h5>

</a>
</div>
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Temprature</p> 
<img src="/degree.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>23.4</h5>

</a>
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Rain</p> 
<img src="/rainn.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>0.04</h5>

</a>
</div>
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Soil Temprature</p> 
<img src="/soil.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>24.5</h5>

</a>
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Humidity</p> 
<img src="/hum.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>64.3</h5>

</a>
</div>
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Solar Rad</p> 
<img src="/sun.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>239.4</h5>

</a>
</div>

</div> 
<p className=' text-gray-300 text-[18px] mt-[50px] '>
Step into the realm of cutting-edge meteorological science as we introduce our advanced machine learning model. Designed to harness the transformative potential of data, this model takes the intricate interplay of humidity, temperature, and solar radiation as its inputs and weaves them into precise predictions of soil temperature.
Unlock the secrets of this powerful model, which stands at the crossroads of meteorology and artificial intelligence. It processes meteorological variables in real-time, providing forecasts of soil temperature with remarkable accuracy. Whether you're a farmer seeking optimal planting times, a climate researcher delving into environmental dynamics, or a curious mind with a passion for meteorology, this model offers a unique opportunity to explore the fusion of science and technology.
</p> 
<section class="bg-white dark:bg-gray-800 mt-[50px]">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md ">
          <h2 class=" sm:text-center mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Soil Temprature Prediction</h2>
          <p class="sm:text-center mx-auto mb-[10px] max-w-2xl font-light text-gray-500 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <div className='flex justify-center gap-4'>
          <p className='text-center  mt-[5px] mb-[5px] text-gray-300'> Soil Temprature: {final?final:""}</p>
          <CopyToClipboard text={final}
          onCopy={() => toast.success("Copied to clipboard")}>
          <button className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>

          </button>
        </CopyToClipboard>
          </div>
         
          
<form>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temperature(degree centigrade)</label>
    <input type="text"  id="email" name="temp" autoComplete='none' onChange={handleChange} class=" outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-700 dark:shadow-sm-light" placeholder="25" required />
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Solar Rad</label>
    <input type="text" id="password" name="solar" onChange={handleChange} class=" outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 dark:shadow-sm-light" placeholder="30" required />
  </div>
  <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Humidity</label>
    <input type="text" id="repeat-password" name="hum" onChange={handleChange} class="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 dark:shadow-sm-light" placeholder="29" required />
  </div>
  <div class="flex items-start mb-6">
   
  </div>
  <button type="submit" onClick={loader} class="text-white bg-green-900 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-900 dark:hover:bg-green-900 dark:focus:ring-green-900">Predict</button>
</form>

      </div>
  </div>
</section>
<footer class="bg-primary-black">
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
          <Link href="/" class="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
       
              AMU
          </Link>
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
   <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    
    />
    
    </motion.div>
   
    </div>

  )
}

export default Analysis