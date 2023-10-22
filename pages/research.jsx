import React, {useEffect, useMemo, useState} from 'react'
import Footer from '../components/Footer'
import { socials } from '../constants'
import { motion } from 'framer-motion'
import { footerVariants } from '../utils/motion'
import styles from '../styles'
import Link from 'next/link'
import { navVariants } from '../utils/motion'
import { db } from '../firebase'
import { onSnapshot,doc } from 'firebase/firestore'
import { slideIn,fadeIn, staggerContainer } from '../utils/motion'
import { saveAs } from 'file-saver'
import { updateDoc} from 'firebase/firestore'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Pagination from '../components/Pagination'






function Research() {
    const[data, setData]= useState([])
    const [orignal,setOriginal]= useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const[currentPage, setCurrentPage]= useState(1)
    const[postsPerPage, setPostsPerPage]= useState(2)

  


    const{isDarkMode, toggleTheme, setIsDarkMode,res}= useContext(AuthContext)


    useEffect(()=>{
     
  
       
        const filtered = res?.filter(
            (item) =>
            item.title.toLowerCase().includes(searchQuery) || item.name.toLowerCase().includes(searchQuery)
          );
          console.log("filtered ",filtered)
          setData(filtered.length > 0 ? filtered : res);
        // const unSub= onSnapshot(doc(db, "research","rcol"), (doc)=>{
         
        //     if(doc.exists()){
            
               
                
               
        //     }  
        // })
        // return ()=>{
        //     unSub()
        // }
        },[searchQuery, res])

        const lastIndex= currentPage * postsPerPage;
        const firstIndex= lastIndex - postsPerPage;

        const currentPosts= data.slice(firstIndex, lastIndex)
     
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const handleSearchChange = (event) => {
            const query = event.target.value
          
         
            setSearchQuery(query.toLowerCase());
           
          };
         
        const handleSearchClick = (event) => {
            event.preventDefault()
            if(searchQuery===""){
                setData(orignal)
            }
            const filtered = data.filter(
              (item) =>
              item.title.toLowerCase().includes(searchQuery) || item.name.toLowerCase().includes(searchQuery)
            );

            setData(filtered.length > 0 ? filtered : orignal);
          };  

          const handleSortChange = (event) => {
            const newSortOption = event.target.value;
            setSortOption(newSortOption);
          
            // Sort the data based on the selected sorting option
            if (newSortOption === "date") {
              const sortedArray = data.slice().sort((a, b) => {
                return b.year - a.year;
              });
              setData(sortedArray);
            } else if (newSortOption === "relevance") {
                const sortedArray = data.slice().sort((a, b) => {
                    return b.relevance - a.relevance;
                  });
                  setData(sortedArray);
              // Handle other sorting options or revert to default order
              // For example, setFilteredData([...originalData]);
            }
            else if (newSortOption === "default"){
               setData(res)
            }
          };
          const highlightText = (text, query) => {
            const lowerCaseText = text.toLowerCase();
            const lowerCaseQuery = query.toLowerCase();
          
            if (!lowerCaseQuery || !lowerCaseText.includes(lowerCaseQuery)) {
              return text;
            }
          
            const index = lowerCaseText.indexOf(lowerCaseQuery);
            const highlightedPart = text.slice(index, index + query.length);
          
            return (
              <>
                {text.substring(0, index)}
                <span className="bg-green-900">{highlightedPart}</span>
                {text.substring(index + query.length)}
              </>
            );
          };
          

       
          
        
        // const handleDownload= async (url)=>{
            
        //     if(url){
        //      saveAs(url, 'amu.odt')
        //      await updateDoc (doc(db, "metro","stations"), {
        //         count: {
        //           downloads:down+1,
                  
  
        //         }
              
                
        //     });
        //     }
     
        // }
        // const handleSortByDate = (event) => {
        //     const sortBy = event.target.value;
          
        //     if (sortBy === "date") {
        //       const sortedArray = data.slice().sort((a, b) => {
        //         return b.year - a.year;
        //       });
        //       setData(sortedArray);
        //     } else if(sortBy=== "relevance") {
        //         const sortedArray = data.slice().sort((a, b) => {
        //             return b.relevance - a.relevance;
        //           });
        //           setData(sortedArray);
        //       // Handle other sorting options or revert to default order
        //       // For example, setData([...originalData]);
        //     }
        //     else{
        //         setData(orignal)
        //     }
        //   };
          
         
          
  return (

     
     <motion.div
    variants={staggerContainer}
   initial="hidden"
   whileInView="show"
   viewport={{once:false, amount:0.25}}
    className={`${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden w-screen  flex justify-center`}>
        <div className='sm:w-[70%] w-[90%] flex flex-col   '>

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

<br/><br/>

       




<form class="flex items-center">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input type="text" onChange={handleSearchChange} id="voice-search" class={` outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full pl-10 p-2.5 ${isDarkMode?"dark:bg-gray-700":""}  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700`} placeholder="Search by title, author(s) name..." required />
      
    </div>
    <button onClick={handleSearchClick} type="submit" class={`inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg border border-green-700 ${isDarkMode?"dark:bg-gray-800 text-white":"text-gray-700"} hover:text-white   dark:hover:bg-green-900 `}>
        <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </button>
</form>
 <br/><br/><br/>

<div class=" w-full flex justify-between items-center mx-auto max-w-screen-xl p-4">
       
        <span className={` text-[16px] leading-[30px] ${isDarkMode?"text-white":"text-black"}`}>Showing {data.length} results</span>
            
   
        <div className='flex   gap-3 items-center'>
        <span className={`${isDarkMode?"text-gray-300":"text-gray-700"}`}>Sort by:</span>
        
        <select onClick={handleSortChange} id="countries" class={` w-[150px] border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 ${isDarkMode?" font-bolder dark:bg-primary-black dark:text-white text-[18px] bg-primary-black":"text-black shadow-lg"}  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-900 dark:focus:border-green-900`}>
 <option value="default">Default</option>
  <option  value="relevance">Relevance</option>
  <option value="date">Date</option>
 
</select>
        </div>
       
               
         
    </div>
 

{currentPosts?.map(d=>{
return <div key={d.id} class={`mt-[20px]  w-full p-4  flex gap-4 justify-between bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
    <div>
<h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>{highlightText(d.title,searchQuery)}</h5>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s):{highlightText(d.name,searchQuery)}</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:{d.year}</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
<p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>{d.desc}</p>
<div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
    <a href={d.file} target="_blank" rel="noopener noreferrer" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        <div class="text-left">
            
            <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
        </div>
    </a>
    <a href={d.file} download class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
    <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
    </a>
</div>

</div>
<img src={d.img}  className='w-[300px]' alt='Image not available' />

</div>

}) }

<Pagination 
currentPosts= {data.length}
postsPerPage={postsPerPage}
setCurrentPage={setCurrentPage}
currentPage={currentPage}

/>




{/* <div class={`mt-[20px] w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
    <h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>On modeling AM city for weather dist</h5>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s): Abebe Gizaw.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:2018.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita ratione magni eius rem in eveniet consequuntur, eligendi exercitationem ad impedit quis excepturi ea natus fugit animi. At qui impedit voluptates. Quibusdam eum facilis harum cum molestias beatae? Vero dolorem impedit accusantium reiciendis labore in perspiciatis dignissimos ratione eligendi iste.</p>
    <div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

            <div class="text-left">
               
                <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
            </div>
        </a>
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
        <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
        </a>
    </div>
</div>


<div class={`mt-[20px] w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8  ${isDarkMode?"dark:bg-gray-800":""} dark:border-gray-700`}>
    <h5 class={`mb-2 text-[22px] font-bold ${isDarkMode?"dark:text-white":"text-black"} `}>On modeling AM city for weather dist</h5>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Author(s): Abebe Gizaw.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Publication Year:2018.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Resource Type:Research.</p>
    <p class={`mb-5 text-base text-gray-500 sm:text-lg ${isDarkMode?"dark:text-gray-400":"text-gray-900"}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita ratione magni eius rem in eveniet consequuntur, eligendi exercitationem ad impedit quis excepturi ea natus fugit animi. At qui impedit voluptates. Quibusdam eum facilis harum cum molestias beatae? Vero dolorem impedit accusantium reiciendis labore in perspiciatis dignissimos ratione eligendi iste.</p>
    <div class="items-center  space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:text-white hover:bg-green-900"}  dark:focus:ring-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

            <div class="text-left">
               
                <div class="-mt-1 font-sans text-sm font-semibold">&nbsp;&nbsp;View PDF</div>
            </div>
        </a>
        <a href="#" class={`w-full sm:w-auto  focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode?"dark:bg-gray-700 text-white dark:hover:bg-gray-600 ":"shadow-lg text-black hover:bg-green-900  hover:text-white"}  dark:focus:ring-gray-700`}>
        <svg class={`w-6 h-6 ${isDarkMode?"dark:text-white":"text-black hover:text-white"} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> 
        </a>
    </div>
</div> */}

       <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative mt-[50px]`}
  >
    <div className={`${isDarkMode?"absolute w-[5%] inset-0 blackish-gradient-01":""}`} />
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
          <Link href="/" class="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
       
              AMU
          </Link>
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
  </motion.footer>
</div>
       
        </motion.div>
         
        
  )
}

export default Research