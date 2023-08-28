import React, { useState } from 'react'
import Footer from '../components/Footer'
import { Source } from 'postcss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { useRouter } from 'next/router'
import Metro_Data from './Metro_Data'


function login() {
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
        event.preventDefault;
        const email= input.email;
        const password= input.password;
        try{
       const res= await signInWithEmailAndPassword(auth, email, password)
      
       router.push("/try")
        }catch(err){
            console.log(err.message)
        }

    }
  return (


    <>
   
    <section class=" bg-gray-50 dark:bg-gray-900">
   
  <div class="h-[100vh] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
         ADMIN    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={handleChange} value={input.email} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={handleChange} value={input.password} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                   
                      <a href="#" class="text-sm font-medium text-blue-700 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="button" onClick={handleSubmit} className="w-full mt-[20px] flex items-center  justify-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
         <span className="font-normal text-[16px] text-white">
         Sign In
         </span>
      
       </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  <Footer/>
</section>

</>

  )
}

export default login