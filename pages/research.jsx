import React, {useEffect, useState} from 'react'
import Footer from '../components/Footer'
import { socials } from '../constants'
import { motion } from 'framer-motion'
import { footerVariants } from '../utils/motion'
import styles from '../styles'
import Link from 'next/link'
import { navVariants } from '../utils/motion'
import { db } from '../firebase'
import { onSnapshot,doc } from 'firebase/firestore'
import { slideIn,fadeIn, staggerContainer } from '../utils/motion'
import { saveAs } from 'file-saver'
import { updateDoc} from 'firebase/firestore'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";





function Research() {
    const[data, setData]= useState([])
  


    const{isDarkMode, toggleTheme, setIsDarkMode}= useContext(AuthContext)


    useEffect(()=>{
        const unSub= onSnapshot(doc(db, "research","rcol"), (doc)=>{
         
            if(doc.exists()){
            
                setData(doc.data().researchs)
               
            }  
        })
        return ()=>{
            unSub()
        }
        },[])
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const relevanceSort= ()=>{
            data.sort((a,b)=>b[1].year-a[1].year)
        }
        // const handleDownload= async (url)=>{
            
        //     if(url){
        //      saveAs(url, 'amu.odt')
        //      await updateDoc (doc(db, "metro","stations"), {
        //         count: {
        //           downloads:down+1,
                  
  
        //         }
              
                
        //     });
        //     }
     
        // }
       console.log(data)
  return (

     
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

<br/><br/>

       




<form class="flex items-center">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input type="text" id="voice-search" class={` outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full pl-10 p-2.5 ${isDarkMode?"dark:bg-gray-700":""}  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700`} placeholder="Search Mockups, Logos, Design Templates..." required />
        <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
        </button>
    </div>
    <button type="submit" class={`inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg border border-green-700 ${isDarkMode?"dark:bg-gray-800 text-white":"text-gray-700"} hover:text-white   dark:hover:bg-green-900 `}>
        <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
    </button>
</form>
 <br/><br/><br/>

<div class=" w-full flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" class="flex items-center">
        <span className={` text-[16px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>Showing 5 results</span>
            
        </Link>
        <div className='flex   gap-3 items-center'>
        <span className={`${isDarkMode?"text-gray-300":"text-gray-700"}`}>Sort by:</span>
        <select id="countries" class={` w-[150px] border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 ${isDarkMode?" font-bolder dark:bg-primary-black dark:text-white text-[18px] bg-primary-black":"text-black shadow-lg"}  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-900 dark:focus:border-green-900`}>
  <option onClick={relevanceSort}  value="arbaminch">Relevance</option>
  <option value="US">Chencha</option>
  <option value="CA">Zigiti</option>
  <option value="FR">Merab</option>
  <option value="DE">Bonkay</option>
</select>
        </div>
       
               
         
    </div>
 

{data?.map(d=>{
return <div key={d.id} class={`mt-[20px] w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
<h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>{d.title}</h5>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s):{d.name}</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:{d.year}</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>{d.desc}</p>
<div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
    <a href={`${d.file}`} class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        <div class="text-left">
            
            <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
        </div>
    </a>
    <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
    <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
    </a>
</div>
</div>
}) }


{/* <div class={`mt-[20px] w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
    <h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>On modeling AM city for weather dist</h5>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s): Abebe Gizaw.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:2018.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita ratione magni eius rem in eveniet consequuntur, eligendi exercitationem ad impedit quis excepturi ea natus fugit animi. At qui impedit voluptates. Quibusdam eum facilis harum cum molestias beatae? Vero dolorem impedit accusantium reiciendis labore in perspiciatis dignissimos ratione eligendi iste.</p>
    <div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

            <div class="text-left">
               
                <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
            </div>
        </a>
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
        <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
        </a>
    </div>
</div>


<div class={`mt-[20px] w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
    <h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>On modeling AM city for weather dist</h5>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s): Abebe Gizaw.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:2018.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita ratione magni eius rem in eveniet consequuntur, eligendi exercitationem ad impedit quis excepturi ea natus fugit animi. At qui impedit voluptates. Quibusdam eum facilis harum cum molestias beatae? Vero dolorem impedit accusantium reiciendis labore in perspiciatis dignissimos ratione eligendi iste.</p>
    <div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

            <div class="text-left">
               
                <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
            </div>
        </a>
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
        <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
        </a>
    </div>
</div> */}

       <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative mt-[200px]`}
  >
    <div className={`${isDarkMode?"absolute w-[50%] inset-0 blackish-gradient-01":""}`} />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
  

      <div className="flex flex-col">
        <div className={`mb-[50px] h-[2px] ${isDarkMode?"bg-white":"bg-gray-700"} opacity-10`} />

        <div className="flex items-center justify-center flex-wrap gap-10">
        
          <p  className={`font-normal text-[14px] ${isDarkMode?"text-white":"text-black"} opacity-50`}>
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
</div>
       
        </motion.div>
         
        
  )
}

export default Research