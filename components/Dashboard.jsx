import React, { useContext, useState } from 'react'
import { motion } from "framer-motion";
import styles from '../styles';
import { navVariants,fadeIn, footerVariants } from '../utils/motion';
import Link from "next/link";
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase';
import { socials } from '../constants';



function Dashboard({children}) {
    const router= useRouter()
    const {currentUser, isDarkMode, toggleTheme}= useContext(AuthContext)
    const[menu, setMenu]= useState(false)
    const handleLogout= ()=>{
        signOut(auth)
        router.push('/')
     
     
      }
  return (
    <div className={`  ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`} >

    <div>
    
    <div className={`sm:hidden block flex flex-col justify-center ${isDarkMode?"dark:bg-gray-800":"bg-white displayshadows"}`}>
    <button onClick={()=>setMenu(!menu)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden   dark:text-gray-400  ">
       <span class="sr-only">Open sidebar</span>
       <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
       </svg>
       
    </button>
    <div
    
    className={`px-2  nonsence ${menu?"h-[150px] mt-2 ml-3 ":" h-[0px]"}`}>
        <p  onClick={toggleTheme} className={`${menu?"block":"hidden"}`}>
        <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d={`${isDarkMode?"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z":"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"}`} />
    </svg>
    
                   <span class="flex-1 ml-3 whitespace-nowrap">{isDarkMode?"Light Mode":"Dark Mode"}</span>
                   
                </a>
        </p>
        <p className={`${menu?"block":"hidden"}`}>
        <a href="#"className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
    </svg>
    
                   <span class="flex-1 ml-3 whitespace-nowrap">Downloads</span>
                   <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white  bg-green-900 rounded-full ">3</span>
                </a>
        </p>
        <p className={`${menu?"block":"hidden"}`}>
        <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
    
                   <span onClick={handleLogout} class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                </a>
        </p>
       </div>
    </div>
    
    
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-[13%] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
       <div className={`h-full px-3 py-4 overflow-y-auto  ${isDarkMode?"dark:bg-gray-800 glassmorphism":"bg-white lightshadow"} `}>
          <ul class="space-y-2 font-medium">
             <li>
                <Link href="/admin-dash" className={` ${router.asPath =="/admin-dash" && isDarkMode?"bg-gray-700":"shadow-lg"} flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-700   ":"text-black  hover:shadow-lg"} group`}>
                 <img src="/favicon.ico" width={20} height={20}/>
                   <span class="ml-3">Dashboard</span>
                </Link>
             </li>
             <li onClick={toggleTheme}>
                <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d={`${isDarkMode?"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z":"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"}`} />
    </svg>
    
                   <span class="flex-1 ml-3 whitespace-nowrap">{isDarkMode?"Light Mode":"Dark Mode"}</span>
                   
                </a>
             </li>
             <li>
                <a href="#"className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
    </svg>
    
                   <span class="flex-1 ml-3 whitespace-nowrap">Downloads</span>
                   <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white  bg-green-900 rounded-full ">3</span>
                </a>
             </li>
             <li>
                <Link href="/admin-dash/research" className={` ${router.asPath=="/admin-dash/research" && isDarkMode?"bg-gray-700":"shadow-lg"} flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900  hover:bg-gray-700  ":"text-black  hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
    
                   <span class="flex-1 ml-3 whitespace-nowrap">Researchs</span>
                </Link>
             </li>
        
       
             <li>
                <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
    
                   <span onClick={handleLogout} class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                </a>
             </li>
          </ul>
       </div>
    </aside>
    </div>
    <main >
        {children}
    </main>
    <br/><br/><br/>
    <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} sm:ml-[10%] ml-0 py-8 relative`}
  >
   <div className={`${isDarkMode?"absolute w-[50%] inset-0 blackish-gradient-01":""}`} />
   
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
     <br/><br/><br/>

      <div className="flex flex-col">
        <div className={`mb-[50px] h-[2px] ${isDarkMode?"bg-white opacity-10":"bg-gray-300"}`} />

        <div className="flex items-center justify-center flex-wrap gap-10">
        
          <p className={`font-normal text-[14px] ${isDarkMode?"text-white":"text-black"}  `}>
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
  )
}

export default Dashboard