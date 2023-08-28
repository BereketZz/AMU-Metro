'use client';
import React, {useEffect, useState } from 'react'
import { useContext } from 'react';
import { auth, db, storage } from '../../firebase';
import { useRouter } from 'next/router';
import { navVariants, fadeIn, footerVariants } from '../../utils/motion';
import { updateDoc, onSnapshot, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer';
import { motion } from "framer-motion";
import styles from '../../styles';
import Dashboard from '../../components/Dashboard';
import { AuthContext } from '../../Context/AuthContext';
import { socials } from '../../constants';


function index() {
 const {currentUser, isDarkMode, setIsDarkMode,toggleTheme} =useContext(AuthContext)   
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
//const[isDarkMode, setIsDarkMode]= useState(true)

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

  return (
   <Dashboard>


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
 
   </Dashboard>

  )
}

export default index