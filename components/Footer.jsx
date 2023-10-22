'use client';

import { motion } from "framer-motion";
import styles from "../styles";
import { footerVariants } from "../utils/motion";
import { socials } from '../constants';
import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import {v4 as uuid} from "uuid"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDoc, collection, addDoc, query, where, getDocs,onSnapshot, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'



const Footer = () => {

  const{ isDarkMode, toggleTheme}= useContext(AuthContext)
  const[email, setEmail]= useState("");
  const[data, setData]= useState([])
  const[right, setRight]= useState()
  const[ res, setRes]= useState([])

  useEffect(()=>{
    const unSub= onSnapshot(doc(db, "sub","subscribe"), (doc)=>{
     
        if(doc.exists()){
            setData(doc.data().email)
           
        }  
    })
    return ()=>{
        unSub()
    }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate the email format (client-side validation)

        // if (!isValidEmail(email)) {
        //   // Handle invalid email format (show an error message, etc.)
        //   return;
        // }
      
        // Check if the email already exists in the database
        const emailExists = await checkIfEmailExists(email);
      
        if (emailExists) {
            toast.error("Invalid Email Adress, Please Try again!")
          // Handle the case where the email already exists (show an error message, etc.)
          return;
        }
      
        // Add the email to the Firebase database
        await addEmailToDatabase(email);
      };
      
      const isValidEmail = (email) => {
        // Implement your email format validation logic here
        // You can use a regular expression or other validation methods
        return true; // Return true if the email is valid, otherwise return false
      };
      
      const checkIfEmailExists = (email) => {
        // Loop through the "data" array to check if the email already exists
        for (let i = 0; i < data.length; i++) {
          if (data[i]?.name === email) {
            return true; // Email already exists
          }
        }
        return false; // Email does not exist
      };
      
      const addEmailToDatabase = async (email) => {
       
        await updateDoc (doc(db, "sub","subscribe"), {
                email: arrayUnion({
                    id:uuid(),
                    name:email,
             
                })
              
                
            });
        // Clear the email input field after successful submission
        setEmail("");
        toast.success("Subscription added successfully")
      };
//   const handleSubmit= async(e)=>{
   
//    e.preventDefault()
//     setRes(data)
//     console.log(res)
//     setRight(true)
//    for(let i=0; i<= res?.length; i++){
//     if(res[i]?.name==email){
//         setRight(false)
//         break;
      
//     }
   
// }
  
//    if(email.length>5 && right==true){
//  t
// setEmail("")

//    }
   

//   }


  return(

  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
   
  >
    <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md sm:text-center">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
          <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form action="#">
              <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div class="relative w-full">
                      <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none dark:focus:border-green-700" placeholder="Enter your email" type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required="" />
                  </div>
                  <div>
                      <button type="submit" onClick={handleSubmit} class=" hover:bg-green-900 py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-green-900">Subscribe</button>
                  </div>
              </div>
              <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
      </div>
  </div>
</section>
<footer class="bg-primary-black">
  <div class="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class=" hover:underline">About</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Explore</a>
                  </li>
               
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Blog</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Sign In</a>
                  </li>
              </ul>
          </div>
          
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Privacy Policy</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Licensing</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Terms</a>
                  </li>
              </ul>
          </div>
         
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Research</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Station Data</a>
                  </li>
                  
              </ul>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
      <div class="text-center">
          <a href="#" class="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
       
              AMU
          </a>
          <span class="block text-sm text-center text-gray-500 dark:text-gray-400">©2023 <a href="#" class="hover:underline">AMU</a>. All Rights Reserved.
          </span>
          <ul class="flex justify-center mt-5 space-x-5">
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
          </ul>
      </div>
  </div>
</footer>
    {/* <div className={`${isDarkMode?"absolute w-[50%] inset-0 blackish-gradient-01":""}`} /> */}
    {/* <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className={`font-bold md:text-[64px] text-[44px] ${isDarkMode?"text-white":"text-gray-700"}`}>
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
        <div className={`mb-[50px] h-[2px] ${isDarkMode?"bg-white":"bg-gray-700"} opacity-10`} />

        <div className="flex items-center justify-center flex-wrap gap-10">
        
          <p className={`font-normal text-[14px] ${isDarkMode?"text-white":"text-black"} opacity-50`}>
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
    </div> */}
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
  </motion.footer>
  
)};

export default Footer;
