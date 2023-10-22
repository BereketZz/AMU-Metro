import React, { useState } from 'react'

function Pagination({postsPerPage, currentPosts, setCurrentPage, currentPage }) {

    const[paginationCurrentPage, setPaginationCurrentPage]=useState(2)
    const[paginationPerPage, setPaginationPerPage]= useState(1)

        const lastIndex= paginationCurrentPage * paginationPerPage;
        const firstIndex= lastIndex - paginationPerPage;
  
    let pages= []

    for(let i=1; i<= Math.ceil(currentPosts/postsPerPage); i++){
        pages.push(i)
    }
    const slicedPages= pages.slice(firstIndex, lastIndex)
    console.log("the current posts : "+currentPosts.length)
    const handleNext= ()=>{
         if(paginationCurrentPage == pages.length){
           return;
        }
        else{
            setPaginationCurrentPage(p=>p+1)
        }
        // setPaginationCurrentPage((p)=>{
        //     if(p+1<=slicedPages.length){

        //     }
        // })
    }
    const handlePrev= ()=>{
        if(paginationCurrentPage-1<=0){
            return;
        }
        else{
            setPaginationCurrentPage(p=>p-1)
        }
    }
  return (
    <div>

<nav className='mt-[30px]  flex justify-center' aria-label=" Page navigation example">
  <ul class="inline-flex -space-x-px text-sm ">
  <li onClick={handlePrev}>
      <a  class="flex items-center justify-center px-3 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
   {
    slicedPages.map(p=><li key={p} onClick={()=>setCurrentPage(p)} >
        <a  className={`flex items-center justify-center px-3 h-10 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-400 ${currentPage==p? "bg-green-900 text-white":"dark:bg-gray-800 dark:text-gray-400"} dark:border-gray-700  dark:hover:bg-gray-700 `}>{p}</a>
      </li>)
   }
      <li onClick={handleNext}>
      <a  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
   
  </ul>
</nav>
    </div>
  )
}

export default Pagination