import React, {useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../Context/AuthContext'

function HeadNav({children}) {
    const{isDarkMode}= useContext(AuthContext)
    const route= useRouter()
  return (
   <div>


<nav class={`${isDarkMode?"border-gray-200 bg-gray-50 sm:dark:bg-gray-800 bg-transparent dark:border-gray-700":""} `}>
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  
   <div>
    .
   </div>
    <div class=" w-full  md:w-auto" id="navbar-solid-bg">
      <ul class="flex  font-medium mt-4 rounded-lg bg-gray-50 flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent sm:dark:bg-gray-800  bg-transparent md:dark:bg-transparent dark:border-gray-700">
        <li className=''>
          <Link  href="/admin-dash/research" class={`block py-2 pl-3 pr-4 hover:text-green-700 hover:bg-gray-700  text-white rounded md:bg-transparent  md:p-0 md:hover:bg-transparent   md:dark:bg-transparent ${route.asPath=="/admin-dash/research"?"sm:text-green-700 dark:bg-green-900 text-white":"text-white"} ${isDarkMode?"text-white":"text-gray-900"}`} aria-current="page">Add Research</Link>
        </li>
        <li>
          <Link href="/admin-dash/research/View" class={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:bg-transparent md:dark:hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${route.asPath=="/admin-dash/research/View"?" bg-green-900 text-white md:text-green-700":"text-white"} ${isDarkMode?"text-white":"text-gray-900"}`}>Research Library</Link>
        </li>
      
      
      </ul>
    </div>
  </div>
</nav>
<main>
    {children}
</main>
</div> 

  )
}

export default HeadNav