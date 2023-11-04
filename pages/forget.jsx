import React, { useState } from 'react'
import Link from 'next/link'
import MiniFooter from '../components/MiniFooter'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function forget() {
    const[email, setEmail]= useState()
   
    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(email.length >12){
        try{
         const res= await sendPasswordResetEmail(auth, email)
         toast.success("Check Your Email")
        }catch(error){
         toast.error("Something went wrong try again!")
        }
    }else{
        toast.warn("Enter a valid Email")
    }
    

   }
   
    

  return (
    <div>
        
           <section class="  bg-gray-50 dark:bg-gray-900">
            <div>
            <Link href="/login" className='text-white absolute left-[50px] top-[30px]'>
                <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
                </h2>


            </Link>
            </div>
          
   <div class=" mb-[100px] flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
 
       <a href="#" class=" mt-[150px] flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
           
          FORGET &nbsp;PASSWORD
       </a>
       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Rest Your Password
               </h1>
               <form class="space-y-4 md:space-y-6" action="#">
                   <div>
                       <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                       <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} class=" outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700" placeholder="name@company.com" required=""/>
                   </div>
                 
                  
                   <button type="button"  onClick={handleSubmit} className="w-full mt-[20px] flex items-center  justify-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
          
          <span className="font-normal text-[16px] text-white">
         Reset
       
          
          
          </span>
       
        </button>
                   
               </form>
           </div>
       </div>
   </div>
  <MiniFooter/>
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
     
 </section>
    </div>
  )
}

export default forget