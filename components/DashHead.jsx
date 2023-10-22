import React, {useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../Context/AuthContext'

function DashHead({children}) {
    const {currentUser, isDarkMode, toggleTheme}= useContext(AuthContext)
    const route= useRouter()
  return (
    <div>
        <div>


<nav className={`${isDarkMode?"sm:dark:bg-gray-800 border-gray-200 bg-gray-50  bg-transparent dark:border-gray-700":""}`}>
  <div class=" w-full  max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  
   <div>
    .
   </div>
   
    <div class="    md:w-auto" id="navbar-solid-bg">
 
    <select id="countries" class={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 ${isDarkMode?"dark:bg-gray-700 dark:text-white":"text-black shadow-lg"}  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-900 dark:focus:border-green-900`}>
<option  value="arbaminch">Arbaminch</option>
<option value="US">Chencha</option>
<option value="CA">Zigiti</option>
<option value="FR">Merab</option>
<option value="DE">Bonkay</option>
</select>
      {/* <ul class="flex  font-medium mt-4 rounded-lg bg-gray-50 flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent sm:dark:bg-gray-800  bg-transparent md:dark:bg-transparent dark:border-gray-700">
        <li className=''>
          <Link  href="/admin-dash/" class={`block py-2 pl-3 pr-4 hover:text-green-700 hover:bg-gray-700  text-white rounded md:bg-transparent  md:p-0 md:hover:bg-transparent   md:dark:bg-transparent ${route.asPath=="/admin-dash"?"sm:text-green-700 dark:bg-green-900 text-white":"text-white"}  ${isDarkMode?"text-white":"text-gray-900"}`} aria-current="page">View</Link>
        </li>
        <li>
          <Link href="/admin-dash/Uploads" class={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:bg-transparent md:dark:hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${route.asPath=="/admin-dash/Uploads"?" bg-green-900 text-white md:text-green-700":"text-white"}  ${isDarkMode?"text-white":"text-gray-900"}`}>Upload</Link>
        </li>
      
      
      </ul> */}
    </div>
  </div>
</nav>
<main>
    {children}
</main>
</div> 
    </div>
  )
}

export default DashHead