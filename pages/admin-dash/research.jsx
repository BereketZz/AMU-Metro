import React, {useContext,useState} from 'react'
import { motion } from 'framer-motion'
import { socials } from '../../constants'
import styles from '../../styles'
import { footerVariants, navVariants } from '../../utils/motion'
import Dashboard from '../../components/Dashboard'
import { AuthContext } from '../../Context/AuthContext'
import { db, storage } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDoc, onSnapshot, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuid} from "uuid"

function research() {
    const{isDarkMode, toggleTheme}= useContext(AuthContext)
    const[check, setCheck]= useState(false)
    const[inp, setInp]= useState({
        name:"",
        year:"",
        title:"",
        desc:"",
        relevance:""
    })
    const handleChange= (e)=>{
        setInp((prev)=>{
            return{
                ...prev,
               [e.target.name]:e.target.value
            }
        })
    }
 
    
    const[data, setData]= useState("")
    const handleUpload=  async ()=>{
        if(data){
            
          setCheck(true)
          console.log("the file is here")
      
          const storageRef = ref(storage, `/research/${data.name+uuid()}`);
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
                  await updateDoc (doc(db, "research","rcol"), {
                    researchs: arrayUnion({
                        id:uuid(),
                        name:inp.name,
                        year:inp.year,
                        title:inp.title,
                        relevance:parseInt(inp.relevance),
                        date:Timestamp.now(),
                        file:downloadURL,
                        
    
    
                    })
                  
                    
                });
                toast("Research uploaded successfully!") 
      
                setCheck(false)
                setData(null)
            
                });
              }
            );
       
            
      }
       }
  return (
    <Dashboard>
  <div className={` w-full  sm:ml-[0%] ml-0  ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`}>
 <div className="text-white flex justify-center items-center flex-col">
  <form className='h-full ' style={{width:"50%",}}>
  <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show">
    <h2  style={{color:'white', fontSize:"40px", marginTop:"50px"}}>Fill the Research Upload form</h2> <br/>

        </motion.div>
  <div class="mb-6">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author(s) Name</label>
    <input type="text"  id="name" name="name" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kaleb Abera" required />
  </div>
  <div class="mb-6">
    <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publication Year</label>
    <input type="text" id="year" name="year" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='2012' required/>
  </div>
  <div class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text" id="title" name="title" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Arbaminch Metrological Dist' required/>
  </div>


<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relevance Index (optional)</label>
<select id="countries"  name="relevance" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
 
  <option value="10">High</option>
  <option value="5">Medium</option>
  <option value="0">Low</option>
</select> <br/>


<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
<textarea id="message" name="desc" onChange={handleChange} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="To make a great impact on the ..."></textarea>
<br/>
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{data?data.name:"Attach file"}</label>
<label htmlFor='file'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-15 h-10 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
</label>

<input type="file" id="file"  className='hidden' onChange={(e)=>setData(e.target.files[0])}/>
<div className='w-full flex   justify-center'>
<button type="button" disabled={check} onClick={handleUpload} className="w-[50%]  mt-[20px] flex items-center  justify-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
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
  
</form>
</div>
<br/>
<motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
   
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

export default research