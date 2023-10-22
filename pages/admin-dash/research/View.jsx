import React, {useContext, useEffect, useState} from 'react'
import Dashboard from '../../../components/Dashboard'
import HeadNav from '../../../components/HeadNav'
import { motion } from 'framer-motion'
import { navVariants, footerVariants } from '../../../utils/motion'
import styles from '../../../styles'
import { AuthContext } from '../../../Context/AuthContext'
import { socials } from '../../../constants'
import { storage , db} from '../../../firebase'
import { ref, deleteObject } from "firebase/storage";
import { collection,doc, FieldValue,arrayRemove,updateDoc } from 'firebase/firestore'
import { Firestore } from 'firebase/firestore'
//Importing Tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//IMporting useRouter
import { useRouter } from 'next/router'



function View() {
    const{isDarkMode, toggleTheme, res, setTemp}= useContext(AuthContext)
    const[data, setData]= useState([])
    const [orignal,setOriginal]= useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const[popup, setPopup]= useState(false)
    const[clickedItem, setClickedItem]= useState()
    const router= useRouter()
    useEffect(()=>{
     
  
       
        const filtered = res?.filter(
            (item) =>
            item.title.toLowerCase().includes(searchQuery) || item.name.toLowerCase().includes(searchQuery)
          );
          console.log("filtered ",filtered)
          setData(filtered.length > 0 ? filtered : res);
     
        },[searchQuery, res])

        const handleDelete = async (item) => {
            //const cityRef = doc(db, 'research', 'rcol')
            //const cityRef = db.collection('research').doc('rcol');

            // Delete the file from Firebase Storage
            if (item.file) {
              const desertRef = ref(storage, item.file);
              await deleteObject(desertRef)
              
            }
           
// Remove the 'capital' field from the document

    // Delete the item from Firebase array
    //firebase.firestore().collection('').doc(rcol)

    const objectToRemove = {
        id:item.id,
        name:item.name,
        desc:item.desc,
        title:item.title,
        relevance:item.relevance,
        date:item.date,
        year:item.year,
        file:item.file,
        
         };
    console.log("the id is: "+item.id)
    // Delete the item from Firebase array
    await updateDoc (doc(db, "research","rcol"), {
       researchs:arrayRemove(objectToRemove)

      
        
    });

          };

        const handleSearchChange = (event) => {
            const query = event.target.value
          
         
            setSearchQuery(query.toLowerCase());
           
          };

          const handleProceed=(item)=>{
            handleDelete(item)
            setClickedItem(null)
            toast.success("Item Removed Successfully")
            
          }

          const handleDeleteIcon= (item)=>{
            
            setClickedItem(item)
           

          }

          const handleEdit=(item)=>{
          setTemp(item)
          router.push("/admin-dash/research")
          }

       
      console.log("the clicked item is: "+clickedItem?.name)
  return (
    <Dashboard>
        <HeadNav>

        
    <div className={` w-full     sm:ml-[5%] ml-0  overflow-hidden flex  items-center flex-col`}>
        
        
<div class=" mt-[50px] w-[60%] relative overflow-x-auto shadow-md sm:rounded-lg">
      
<motion.div
variants={navVariants}
initial="hidden"
whileInView="show"
className={`${clickedItem!=null?"":"hidden"}`}
>
<div id="info-popup" tabindex="-1" class={` overflow-y-auto overflow-x-hidden  flex justify-center  z-50 w-full md:inset-0 h-modal md:h-full`}>
  <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
      <div class=" relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400 ">
          
              <div>
                 <h3 class="mb-3 text-[15px] font-bold  text-gray-900 dark:text-white flex items-center gap-2">   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-red-700 text-[20px] font-bold ">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
               </svg>{`Permanently Remove "${clickedItem?.title}" ?`}</h3>

              </div>
             
          </div>
          <div class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
              
              <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                  <button id="close-modal" type="button" onClick={()=>setClickedItem(null)}  class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-900 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                  <button id="confirm-button" type="button" onClick={()=>handleProceed(clickedItem)} class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-gray-600">Okay</button>
              </div>
          </div>
      </div>
  </div>
</div>
</motion.div>



    <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input onChange={handleSearchChange}  type="text" id="table-search" class="block outline-none p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
             
                <th scope="col" class="px-6 py-3">
                   Research Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Author(s)
                </th>
                <th scope="col" class="px-6 py-3">
                    Year
                </th>
                <th scope="col" class="px-6 py-3">
                   Remove
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
            </tr>
        </thead>
        <tbody>
            {
               data?.map(d=>{
                return  <tr key={d.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {d.title}
                </th>
                <td class="px-6 py-4">
                    {d.id}
                </td>
                <td class="px-6 py-4">
                   {d.name}
                </td>
                <td class="px-6 py-4">
                   {d.year}
                </td>
                <td class="px-6 py-4">
                <button  onClick={()=>handleDeleteIcon(d)}  type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                    </button>
                </td>
                <td class="px-6 py-4">
                <button   type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
                    </button>
                </td>
                

            </tr>
            
               })
            }
            
           
        </tbody>
    </table>

</div>
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
    </HeadNav>

    </Dashboard>
  )
}

export default View