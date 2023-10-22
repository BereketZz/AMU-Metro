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
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis ,
  AreaChart,defs,linearGradient,stop,Area, ResponsiveContainer


} from 'recharts';
import DashHead from '../../components/DashHead';


function index() {
  const router= useRouter()

 const {currentUser, isDarkMode, setIsDarkMode,toggleTheme, res} =useContext(AuthContext)   
 const[data, setData]= useState(null)
 const[check, setCheck]= useState(false)

 const[date, setDate]= useState("")
 const[down, setDown]= useState(null)
 const[menu, setMenu]= useState(false)
 const options = { year: 'numeric', month: 'long', day: 'numeric' };

 useEffect( ()=>{
   
  // !!currentUser?.email? router.push('/admin-dash'):router.push('/login')
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

 // The chart Data

 const marsh = [
  {
    "name": "Jan",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Feb",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "March",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Apr",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "May",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Jun",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Jul",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

  return (
   <Dashboard>

   <DashHead>
    <div className={`sm:ml-[10%] ml-0   ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`}>
    <br/><br/>
    <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="text-white flex justify-center items-center flex-col" >
     <div className=" w-[80%] justify-evenly items-center gap-4 flex sm:flex-row  flex-col">
       

<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Last Updat</p> 
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-green-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>



  </div> 
<h5 className={`mb-2 text-xl tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>{date?date?.toDate().toLocaleString([], options):"-"}</h5>

</a>


<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Downloads</p> 
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-green-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>



  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>{down? down:"-"}</h5>

</a>
<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Researchs</p> 
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-green-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
</svg>




  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>{res? res.length:"-"}</h5>

</a>

<a href="#" className={`flex flex-col items-center gap-2 justify-center min-h-[150px] min-w-[220px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${isDarkMode?"dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700":"shadow-lg"}  `}>


<div className={` flex justify-center items-center gap-4 font-normal  ${isDarkMode?"dark:text-gray-400":"text-black"}`}>
 <p>Requests</p> 
 

 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-green-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
</svg>


  </div> 
<h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode?"dark:text-white":"text-black"} `}>0</h5>

</a>




     </div>
     <div className='mt-[100px] w-full '>
    
<div className=' flex justify-center'>
  
<input type="file" id="file" onChange={(event)=>setData(event.target.files[0])} className="hidden" />   
<label htmlFor="file"   className={`sm:h-[300px] h-[150px] flex flex-col justify-center items-center mt-[50px] sm:w-[70%] w-[70%] ${isDarkMode?"border-gray-300":"border-black"}`}>
<img src="/up2.svg" className="w-[100%] h-[100%]" />
<p className={` mt-[10px] ${isDarkMode?"text-gray-300":"text-black"}`}>{data!=null?data.name:"No file Selected"}</p>
</label>
</div>
<div className='flex  justify-center'>
<button type="button" disabled={check} onClick={handleUpload}  className=" mt-[20px] flex items-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
  
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
     </div>
  
{/*     
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
      
       </button> */}

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
   </DashHead>
   </Dashboard>

  )
}

export default index