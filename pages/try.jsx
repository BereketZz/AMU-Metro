import React, { useContext, useEffect, useState }  from 'react'
import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants, fadeIn } from "../utils/motion";
import Navbar from "../components/Navbar";
import { footerVariants } from "../utils/motion";
import Footer from "../components/Footer";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../Context/AuthContext';
import { signOut } from 'firebase/auth';
import cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { updateDoc, onSnapshot, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from '../firebase';






import { socials } from '../constants';

function tryi() {
 const router= useRouter()
 const {currentUser,isDarkMode, toggleTheme, setIsDarkMode }= useContext(AuthContext)
 const[data, setData]= useState(null)
 const[check, setCheck]= useState(false)

 const[date, setDate]= useState("")
 const[down, setDown]= useState(null)
 const[menu, setMenu]= useState(false)
 const options = { year: 'numeric', month: 'long', day: 'numeric' };


 useEffect( ()=>{

  //!!currentUser?.email? router.push('/try'):router.push('/login')
  const unSub= onSnapshot(doc(db, "metro","stations"), (doc)=>{
         
    if(doc.exists()){
        setDate(doc.data().am.date)
        setDown(doc.data().count.downloads)
    }  
})
return ()=>{
    unSub()
}

   
  

  
 },[])
 console.log("is it working?"+isDarkMode, toggleTheme)
 const handleUpload=  async ()=>{
  if(data){
    setCheck(true)
    console.log("the file is here")

    const storageRef = ref(storage, `/stations/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
//
 uploadTask.on('state_changed', 
          (snapshot) => {
          // This function can be used to track upload progress
           },

        (error) => {
          console.error('Error uploading file', error);
        }, 
        () => {
          
        
         getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
           // This code is to update the seen object's view property to false
            await updateDoc (doc(db, "metro","stations"), {
              am: {
                date:Timestamp.now(),
                url:downloadURL

              }
            
              
          });
          toast("File uploaded successfully!") 

          setCheck(false)
          setData(null)
      
          });
        }
      );
 
      
}
 }
 const handleLogout= ()=>{
   signOut(auth)
   router.push('/')


 }

  return (
    <div className={` ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`} >

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
            <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900  bg-gray-700 ":"text-black shadow-lg"} group`}>
             <img src="/favicon.ico" width={20} height={20}/>
               <span class="ml-3">Dashboard</span>
            </a>
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
            <a href="#" className={`flex items-center p-2  rounded-lg ${isDarkMode?" dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 ":"text-black hover:shadow-lg"} group`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
</svg>

               <span class="flex-1 ml-3 whitespace-nowrap">Researchs</span>
            </a>
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
<div className={`sm:ml-[10%] ml-0  ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`}>
    <br/><br/>
    <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="text-white flex justify-center items-center flex-col" >
     <div className=" w-[80%] justify-evenly items-center gap-5 flex sm:flex-row  flex-col">
       
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[100px] min-w-[200px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>

    
<p className={`font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>Last Update</p> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>{date?date?.toDate().toLocaleString([], options):"-"}</h5>

</a>

<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[100px] min-w-[200px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>

    
<p className={`font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>Downloads</p> <br/>
<h2 className={`font-extrabold text-[50px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>{down?down:"-"}</h2>

</a>
<Link href="/dashboard/research" className={`flex flex-col items-center gap-2 justify-center min-h-[100px] min-w-[200px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>

    
<p className={`font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>Reaearch</p> <br/>
<h2  className={`font-extrabold text-[50px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>7</h2>

</Link>

<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[100px] min-w-[200px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>

    
<p className={`font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>Requests</p> <br/>
<h2  className={`font-extrabold text-[50px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>3</h2>

</a>



      
     </div>
    
     <div className="  mt-[100px] sm:w-[50%] w-[80%] justify-center flex flex-row items-center gap-2"> 
       <h2 className={`${isDarkMode?"text-white":"text-black"}`}>Select a station</h2>

<div>
 
<select id="countries" class={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 ${isDarkMode?"dark:bg-gray-700 dark:text-white":"text-black shadow-lg"}  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-900 dark:focus:border-green-900`}>
  <option  value="arbaminch">Arbaminch</option>
  <option value="US">Chencha</option>
  <option value="CA">Zigiti</option>
  <option value="FR">Merab</option>
  <option value="DE">Bonkay</option>
</select>
</div>




     </div>
   <br/><br/>
   <input type="file" id="file" onChange={(event)=>setData(event.target.files[0])} className="hidden" />   
     <label htmlFor="file"   className={`sm:h-[250px] h-[150px] flex flex-col justify-center items-center mt-[50px] sm:w-[50%] w-[70%] border border-dashed ${isDarkMode?"border-gray-300":"border-black"}`}>
  <img src="/upload.png" className="w-[20%] h-[40%]" />
  <p className={`${isDarkMode?"text-gray-300":"text-black"}`}>{data!=null?data.name:"No file Selected"}</p>
</label>

<button type="button" disabled={check} onClick={handleUpload} className=" mt-[20px] flex items-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
         <span className="font-normal text-[16px] text-white">

         {check?   <>
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Uploading ...
         </>: "Upload"
      
      
         
         }
         </span>
      
       </button>

    </div>
    </motion.footer>

    <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
   
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className={`font-bold md:text-[40px] text-[30px] ${isDarkMode?"text-white":"text-black"}`}>
        AMU
        </h4>
        <button type="button" className="flex items-center h-fit py-4 px-6 bg-green-900 rounded-[32px] gap-[12px]">
         
          <span className="font-normal text-[16px] text-white">
           Get Started
          </span>
          <img
            src="/arrow.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>
      </div>

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
   </div>






    </div>
  )
}

export default tryi



