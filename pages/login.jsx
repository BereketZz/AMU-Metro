import React, { useState } from 'react'
import MiniFooter from '../components/MiniFooter'
import { Source } from 'postcss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function login() {

    const[check, setCheck]= useState(false)
    const router= useRouter()
    const[input, setInput]= useState({
        email:"",
        password:""
    })
    const handleChange=(event)=>{
     setInput((prev)=>{

        return{
            ...prev,
            [event.target.name]:event.target.value
        }
        
     })
    }
    console.log(input)

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const email= input.email;
        const password= input.password;
        try{
            setCheck(true)
       const res= await signInWithEmailAndPassword(auth, email, password)
      
       router.push("/admin-dash")
        }catch(err){
            toast.error(err.message)
            console.log(err.message)
        }
        setCheck(false)

    }
  return (


    <>
   
    <section class="  bg-gray-50 dark:bg-gray-900">
    <div>
            <Link href="/" className='text-white absolute left-[50px] top-[30px]'>
                <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
                </h2>


            </Link>
            </div>
   
  <div class=" mb-[100px] flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">

      <a href="#" class=" mt-[150px] flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
         ADMIN &nbsp;LOGIN
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign In 
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={handleChange} value={input.email} class=" outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={handleChange} value={input.password} placeholder="••••••••" class=" outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                   
                      <Link href="/forget" class="text-sm font-medium text-blue-700 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <button type="button" disabled={check} onClick={handleSubmit} className="w-full mt-[20px] flex items-center  justify-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
         <span className="font-normal text-[16px] text-white">
         {check?   <>
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Sining In ...
         </>: "Sign In"
      
      
         
         }
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

</>

  )
}

export default login