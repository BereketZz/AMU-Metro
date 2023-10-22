import React, {useContext, useEffect, useState} from 'react'
import HeadNav from '../../../components/HeadNav'
import Dashboard from '../../../components/Dashboard'
import { motion } from 'framer-motion'
import { navVariants, footerVariants } from '../../../utils/motion'
import styles from '../../../styles'
import { AuthContext } from '../../../Context/AuthContext'
import { socials } from '../../../constants'
import { storage , db} from '../../../firebase'
import { collection,doc, FieldValue,arrayRemove,getDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';



function index() {
    const{isDarkMode, toggleTheme, sub}= useContext(AuthContext)
    const[data, setData]= useState([])
    const [orignal,setOriginal]= useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const[demo, setDemo]= useState([])
    useEffect(()=>{
     
     
       
        const filtered = sub?.filter(
            (item) =>
            item.name.toLowerCase().includes(searchQuery)
          );
          console.log("filtered ",filtered)
          setData(filtered.length > 0 ? filtered : sub);
        
        },[searchQuery, sub])

        const handleDelete = async (item) => {
            // Delete the file from Firebase Storage
            if (item.url) {
              const storageRef = storage.refFromURL(item.downloadUrl);
              await storageRef.delete();
            }
           
// Remove the 'capital' field from the document
const washingtonRef = db.collection('research').doc('rcol');

    // Delete the item from Firebase array
    const removeRes = await washingtonRef.update({
      researchs: FieldValue.arrayRemove('east_coast')
    });
    

          };

        const handleSearchChange = (event) => {
            const query = event.target.value
          
         
            setSearchQuery(query.toLowerCase());
           
          };

         

  return (
    <Dashboard>

    
<div className={` w-full     sm:ml-[5%] ml-0  overflow-hidden flex  items-center flex-col`}>
<h3 className='text-gray-200 text-[22px] mt-[50px] w-[60%]'>Subscriptions and Email address</h3>

    
<div class=" mt-[50px] w-[60%] relative overflow-x-auto shadow-md sm:rounded-lg">
<div class="pb-4 bg-white dark:bg-gray-900">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative mt-1">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={handleSearchChange}  type="text" id="table-search" class="block outline-none p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700" placeholder="Search for items" />
    </div>
</div>
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
         
           
            <th scope="col" class="px-6 py-3">
                Email Id
            </th>
            <th scope="col" class="px-6 py-3">
               Email
            </th>
            <th scope="col" class="px-6 py-3">
               Copy
            </th>
           
           
        </tr>
    </thead>
    <tbody>
        {
           data?.map(d=>{
            return  <tr key={d.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
           
           
            <td class="px-6 py-4">
                {d.id}
            </td>
            <td class="px-6 py-4">
               {d.name}
            </td>
            <td class="px-6 py-4">
            <CopyToClipboard text={d.name}
            onCopy={() => toast.success("Copied to clipboard")}
            >
            <button className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>

          </button>
            </CopyToClipboard>
          
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

</Dashboard>
  )
}

export default index