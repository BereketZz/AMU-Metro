import React, {useContext, useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import { db } from '../../firebase';

import { onSnapshot, doc , updateDoc } from "firebase/firestore";
import { fadeIn, slideIn } from '../../utils/motion'
import MetroD from '../../components/MetroD'
import { AuthContext } from '../../Context/AuthContext'

function chencha() {
  const[date, setDate]= useState("")
    const[url, setUrl]= useState(null)
    const[down, setDown]= useState(null)
    const[turn, setTurn]=  useState(true)
    const{isDarkMode, toggleTheme, setIsDarkMode}= useContext(AuthContext)
    useEffect(()=>{
        const unSub= onSnapshot(doc(db, "metro","stations"), (doc)=>{
         
            if(doc.exists()){
                setDate(doc.data().am.date)
                setUrl(doc.data().am.url)
                setDown(doc.data().count.downloads)
            }  
        })
        return ()=>{
            unSub()
        }
        },[])
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const handleDownload= async (url)=>{
            
            if(url){
             saveAs(url, 'amu.odt')
             await updateDoc (doc(db, "metro","stations"), {
                count: {
                  downloads:down+1,
                  
  
                }
              
                
            });
            }
     
        }
        console.log("the data "+url, date)
  return (
    <MetroD>
    <div className='w-full flex flex-col '>
    <h2 className={` mt-[50px] ${isDarkMode?"text-white":"text-gray-700"}  text-[20px] font-bold`}>Sample Data for Chencha Station</h2>  
<p className={`${isDarkMode?"text-white":"text-gray-700"} `}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quo, impedit ad quod reiciendis voluptatum illo soluta cum nam nesciunt, saepe tempora! Amet nulla corporis vero ipsam quia reiciendis, odio dolorem laboriosam esse perspiciatis aliquid dicta temporibus, asperiores accusantium quo eos officia ex quaerat provident architecto nihil! Quibusdam, deserunt voluptatibus?</p> 

<p className='mb-[10px] mt-[50px] flex items-center gap-3 text-white text-[20px]'><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/>
</svg>{date?date?.toDate().toLocaleString([], options):"-"}</p>  
<motion.div 
variants={slideIn('left', 'tween', 0.2,1)}
class="relative overflow-x-auto">
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class={`text-xs border border-gray-700 text-gray-700 uppercase ${isDarkMode?"bg-gray-50 dark:bg-gray-700 dark:text-gray-400":"bg-white text-gray-700"} `}>
        <tr>
            <th scope="col" class="px-6 py-3">
                Product name
            </th>
            <th scope="col" class="px-6 py-3">
                Color
            </th>
            <th scope="col" class="px-6 py-3">
                Category
            </th>
            <th scope="col" class="px-6 py-3">
                Price
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700" }  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>

        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row"class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">
                White
            </td>
            <td class="px-6 py-4">
                Laptop PC
            </td>
            <td class="px-6 py-4">
                $1999
            </td>
        </tr>
        <tr class={`bg-white border ${isDarkMode?"dark:bg-gray-800":"bg-white text-gray-700"}  dark:border-gray-700`}>
            <th scope="row" class={`px-6 py-4 font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-700"} whitespace-nowrap `}>
                Magic Mouse 2
            </th>
            <td class="px-6 py-4">
                Black
            </td>
            <td class="px-6 py-4">
                Accessories
            </td>
            <td class="px-6 py-4">
                $99
            </td>
        </tr>
    </tbody>
</table>
</motion.div>
<motion.div
variants={fadeIn('up', 'tween',0.3,1)}

className={`mt-[50px] flex justify-center text-bold w-full text-center ${isDarkMode?"text-white":"text-gray-700"}  `}
>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
</svg>

</motion.div>

<p className={`mt-[50px] ${isDarkMode?"text-white":"text-gray-700"} font-[16px]`}>
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam laborum quis velit perferendis cupiditate error, eum quas unde. Perferendis, iste libero! Eius suscipit commodi tempora iusto optio magnam voluptatum, labore culpa incidunt in dolore, ducimus asperiores facere eligendi dolorum magni, id nostrum eos veniam quisquam quas. Reiciendis delectus provident exercitationem!<br/><br/>
Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae molestiae soluta minus fugit accusamus corrupti architecto sint eos hic rerum, mollitia, porro unde. Possimus, omnis expedita minima quibusdam autem placeat reiciendis ullam atque dolores? Commodi dicta laborum quo consectetur cumque. Dolorem quas esse et iste totam dolor ex illum.
</p>
</div>
<button onClick={()=>handleDownload(url)} className=" mt-[50px] w-[190px] flex items-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
         <span className="font-normal flex gap-3 text-[16px] text-white">
         <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
</svg> Download
         </span>
      
       </button>
</MetroD>
  )
}

export default chencha