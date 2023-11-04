import React,{useEffect, useState, useContext} from 'react'
import * as tf from '@tensorflow/tfjs';
import { navVariants, staggerContainer } from '../utils/motion';
import MiniFooter from '../components/MiniFooter';
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
<p className={`${isDarkMode? "text-gray-300":"text-gray-700"} text-[18px] mt-[10px] `}>
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
<p className={`${isDarkMode? "text-gray-300":"text-gray-700"} text-[18px] mt-[10px] `}>
Intrigued by the forces that shape our world's climate? Join us on an illuminating journey through the numerical tapestry of meteorological data spanning the past seven years, from 2016 to 2022. Our comprehensive analysis presents a trio of key metrics: average wind speed, solar radiation, and soil temperature.
Discover the subtleties of wind dynamics, solar energy patterns, and soil thermal behavior, all expressed in clear, numeric values. These multi-dimensional statistics reveal the intricate interplay between these essential meteorological elements and provide valuable insights into the evolving climate.
</p> 

<div className=' mt-[30px] grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>

<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Wind Speed</p> 
<img src="/speed1.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>0.7</h5>

</a>
</div>
<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Temprature</p> 
<img src="/degree.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>23.4</h5>

</a>
</div>

<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Rain</p> 
<img src="/rainn.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>0.04</h5>

</a>
</div>
<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Soil Temprature</p> 
<img src="/soil.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>24.5</h5>

</a>
</div>

<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Humidity</p> 
<img src="/hum.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>64.3</h5>

</a>
</div>
<div className={`${isDarkMode?"dark:bg-gray-800 dark:border-gray-700":"bg-white border-gray-300"} max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow `}>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Solar Rad</p> 
<img src="/sun.svg"  width={100} height={100}/>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>239.4</h5>

</a>
</div>

</div> 
<p className={`${isDarkMode? "text-gray-300":"text-gray-700"} text-[18px] mt-[10px] `}>
Step into the realm of cutting-edge meteorological science as we introduce our advanced machine learning model. Designed to harness the transformative potential of data, this model takes the intricate interplay of humidity, temperature, and solar radiation as its inputs and weaves them into precise predictions of soil temperature.
Unlock the secrets of this powerful model, which stands at the crossroads of meteorology and artificial intelligence. It processes meteorological variables in real-time, providing forecasts of soil temperature with remarkable accuracy. Whether you're a farmer seeking optimal planting times, a climate researcher delving into environmental dynamics, or a curious mind with a passion for meteorology, this model offers a unique opportunity to explore the fusion of science and technology.
</p> 
<section class={`${isDarkMode? "dark:bg-gray-800":" displayshadows border-gray-300"} mt-[50px]`}>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md ">
          <h2 class={` ${isDarkMode? "dark:text-white":"text-gray-900 "} sm:text-center mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl `}>Soil Temprature Prediction</h2>
          <p class={` ${isDarkMode? "text-white":"dark:text-gray-500"} sm:text-center mx-auto mb-[10px] max-w-2xl font-light  sm:text-xl ` }> Help you make your decisions based on data driven insights</p>
          <div className='flex justify-center gap-4'>
          <p className={` ${isDarkMode?"text-white":"text-gray-500"} text-center  mt-[5px] mb-[5px] `}> Soil Temprature: {final?final:""}</p>
          <CopyToClipboard text={final}
          onCopy={() => toast.success("Copied to clipboard")}>
          <button className={`${isDarkMode?"text-gray-300":"text-gray-500"} `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>

          </button>
        </CopyToClipboard>
          </div>
         
          
<form>
  <div class="mb-6">
    <label for="email" class={`${isDarkMode?"dark:text-white":"text-white"} block mb-2 text-sm font-medium text-gray-900 `}>Temperature(degree centigrade)</label>
    <input type="text"  id="email" name="temp" autoComplete='none' onChange={handleChange} className={` ${isDarkMode?"dark:bg-gray-700":" bg-white border-gray-300"} outline-none shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-900 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-700 dark:shadow-sm-light`} placeholder="25" required />
  </div>
  <div class="mb-6">
    <label for="password" class={`${isDarkMode?"dark:text-white":"text-white"} block mb-2 text-sm font-medium text-gray-900 `}>Solar Rad</label>
    <input type="text" id="password" name="solar" onChange={handleChange} className={` ${isDarkMode?"dark:bg-gray-700":" bg-white border-gray-300"} outline-none shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-900 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-700 dark:shadow-sm-light`} placeholder="30" required />
  </div>
  <div class="mb-6">
    <label for="repeat-password" class={`${isDarkMode?"dark:text-white":"text-white"} block mb-2 text-sm font-medium text-gray-900 `}>Humidity</label>
    <input type="text" id="repeat-password" name="hum" onChange={handleChange} className={` ${isDarkMode?"dark:bg-gray-700":" bg-white border-gray-300"} outline-none shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-900 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-700 dark:shadow-sm-light`} placeholder="29" required />
  </div>
  <div class="flex items-start mb-6">
   
  </div>
  <button type="submit" onClick={loader} class="text-white bg-green-900 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-900 dark:hover:bg-green-900 dark:focus:ring-green-900">Predict</button>
</form>

      </div>
  </div>
</section>
   
      <MiniFooter/>  
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