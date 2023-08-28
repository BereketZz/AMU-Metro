import React, { useEffect, useState,useContext} from 'react'
import { socials } from '../constants'
import { motion } from 'framer-motion'
import { footerVariants, navVariants,slideIn,fadeIn, staggerContainer } from '../utils/motion'
import styles from '../styles'
import Link from 'next/link'
import { db } from '../firebase'
import { onSnapshot,doc,updateDoc } from 'firebase/firestore'
import { saveAs } from 'file-saver'
import { AuthContext } from '../Context/AuthContext'
import { useRouter } from 'next/router'




function MetroD({children}) {
    const router= useRouter()
    const[date, setDate]= useState("")
    const[url, setUrl]= useState(null)
    const[down, setDown]= useState(null)
    const[turn, setTurn]=  useState(true)

    const{isDarkMode, toggleTheme, setIsDarkMode}= useContext(AuthContext)


    useEffect(()=>{
        const unSub= onSnapshot(doc(db, "metro","stations"), (doc)=>{
         
            if(doc.exists()){
                setDate(doc.data().am.date)
                setUrl(doc.data().am.url)
                setDown(doc.data().count.downloads)
            }  
        })
        return ()=>{
            unSub()
        }
        },[])
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const handleDownload= async (url)=>{
            
            if(url){
             saveAs(url, 'amu.odt')
             await updateDoc (doc(db, "metro","stations"), {
                count: {
                  downloads:down+1,
                  
  
                }
              
                
            });
            }
     
        }
        console.log("the data "+url, date)
  return (
    <motion.div
    variants={staggerContainer}
   initial="hidden"
   whileInView="show"
   viewport={{once:false, amount:0.25}}
    className={`${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden w-screen  flex justify-center`}>
        <div className='w-[60%] flex flex-col   '>

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
<nav class={`bg-green-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 border-[1px] border-gray-500`}>
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                <li >
                    <Link href="/m-datas" class={`text-gray-900 ${router.asPath==="/m-datas" && "underline"} ${isDarkMode?" dark:text-white":"text-gray-700"} hover:underline`} aria-current="page">Arbaminch</Link>
                </li>
                <li >
                    <Link href="/m-datas/chencha" class={`text-gray-900 ${router.asPath==="/m-datas/chencha" && "underline"} ${isDarkMode?" dark:text-white":"text-gray-700"} hover:underline`}>Chencha</Link>
                </li>
                <li>
                    <a href="#" class={`text-gray-900 ${isDarkMode?" dark:text-white":"text-gray-700"} hover:underline`}>Station-3</a>
                </li>
                <li>
                    <a href="#" class={`text-gray-900 ${isDarkMode?" dark:text-white":"text-gray-700"} hover:underline`}>Station-4</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<br/><br/>
<main>
    {children}
</main>
       
 

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

export default MetroD