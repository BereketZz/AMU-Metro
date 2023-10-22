import React, {useContext,useState} from 'react'
import { motion } from 'framer-motion'
import { socials } from '../../../constants'
import styles from '../../../styles'
import { footerVariants, navVariants } from '../../../utils/motion'
import Dashboard from '../../../components/Dashboard'
import { AuthContext } from '../../../Context/AuthContext'
import { db, storage } from '../../../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDoc, onSnapshot, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuid} from "uuid"
import HeadNav from '../../../components/HeadNav'

function index() {
    const{isDarkMode, toggleTheme,temp}= useContext(AuthContext)
    const[check, setCheck]= useState(false)
    const[inp, setInp]= useState({
        name:"",
        year:"",
        title:"",
        desc:"",
        relevance:""
    })
    const[fileUrl, setFileUrl]= useState("")
    const[imgUrl, setImgUrl]= useState("")

   
    const [img, setImg]=useState("")

    //temp!=null?setInp(temp):
    const handleChange= (e)=>{
        setInp((prev)=>{
            return{
                ...prev,
               [e.target.name]:e.target.value
            }
        })
    }
 
    
    const[data, setData]= useState("")
    const handleUpload=  async ()=>{
        if(data && img){
            
          setCheck(true)
          console.log("the file is here")
      
          const storageRef = ref(storage, `/research/${data.name+uuid()}`);
          const storageImg= ref(storage,`/research/Img/${img.name+uuid()}`)
          const uploadFile = uploadBytesResumable(storageRef, data);
          const uploadImg= uploadBytesResumable(storageImg, img);
          var noman=""
      //
       uploadFile.on('state_changed', 
                (snapshot) => {
                // This function can be used to track upload progress
                 },
      
              (error) => {
                console.error('Error uploading file', error);
              }, 
              () => {
                
              
               getDownloadURL(uploadFile.snapshot.ref).then( async (downloadURL) => {
               
              noman=downloadURL
              console.log("the file url is: "+ downloadURL)
               
             
                });
              }
            );

            uploadImg.on('state_changed', 
                (snapshot) => {
                // This function can be used to track upload progress
                 },
      
              (error) => {
                console.error('Error uploading file', error);
              }, 
              () => {
                
              
               getDownloadURL(uploadImg.snapshot.ref).then( async (downloadURL) => {
                 // This code is to update the seen object's view property to false
        
            await updateDoc (doc(db, "research","rcol"), {
              researchs: arrayUnion({
                  id:uuid(),
                  name:inp.name,
                  year:inp.year,
                  title:inp.title,
                  relevance:parseInt(inp.relevance),
                  date:Timestamp.now(),
                  file:noman,
                  desc:inp.desc,
                  img:downloadURL
                  


              })
            
              
          });
          toast.success("Research uploaded successfully") 
      
          setCheck(false)
          setData(null)
          setInp((prev)=>{
            return{
              name:"",
              year:"",
              title:"",
              desc:"",
              relevance:""
            }
        })
          setImg(null)
                });
              }
            );

           
       
            
      }
       }
  return (
    <Dashboard>
      <HeadNav>
   
  <div className={` w-full  sm:ml-[5%] ml-0  ${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`}>
 <div className="text-white flex justify-center items-center flex-col">
  <form className='h-full ' style={{width:"50%",}}>
  <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show">
    <h2 className={`${isDarkMode?"text-white":"text-gray-900"} mt-[50px] text-[40px]`} >Research Upload form</h2> <br/>

        </motion.div>
  <div class="mb-6">
    <label for="name" class={`block mb-2 text-sm font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-900"} `}>Author(s) Name</label>
    <input type="text"  id="name" name="name" onChange={handleChange} value={inp.name} class={isDarkMode? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none":" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none" }placeholder="Kaleb Abera" required />
  </div>
  <div class="mb-6">
    <label for="year" class={`block mb-2 text-sm font-medium  ${isDarkMode?"dark:text-white":"text-gray-900"} `}>Publication Year</label>
    <input type="text" id="year" name="year" onChange={handleChange} value={inp.year} class={isDarkMode?"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700  outline-none":" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-greem-700 ouline-none" } placeholder='2012' required/>
  </div>
  <div class="mb-6">
    <label for="title" class={`block mb-2 text-sm font-medium ${isDarkMode?"dark:text-white":"text-gray-900"} `}>Title</label>
    <input type="text" id="title" name="title" onChange={handleChange}  value={inp.title} class={isDarkMode?"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none":" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none" } placeholder='Arbaminch Metrological Dist' required/>
  </div>


<label for="countries" class={`block mb-2 text-sm font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-900"}`}>Relevance Index (optional)</label>
<select id="countries"  name="relevance" onChange={handleChange} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-700 block w-full p-2.5 ${isDarkMode?"dark:bg-gray-700 dark:border-gray-600 dark:text-white":"bg-white border-gray-300 text-gray-500"}  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-green-700`}>
 
  <option value="10">High</option>
  <option value="5">Medium</option>
  <option value="0">Low</option>
</select> <br/>


<label for="message" class={`block mb-2 text-sm font-medium text-gray-900 ${isDarkMode?"dark:text-white":"text-gray-900"} `}>Description</label>
<textarea id="message" name="desc" onChange={handleChange} value={inp.desc} rows="4" class={`${isDarkMode?" border-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none ":"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-700 outline-none"}`} placeholder="To make a great impact on the ..."></textarea>
<br/>
<div className='flex gap-6'>
  <div>
<label for="message" class={`block mb-2 text-sm font-medium ${isDarkMode?"dark:text-white":"text-gray-900"} `}>{data?data.name:"Attach file"}</label>
<label htmlFor='file'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-15 h-10 ${isDarkMode?"text-white":"text-gray-900"} ${img? "text-green-700" :""}`}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
</label>
</div>
<div>
<label for="message" class={`block mb-2 text-sm font-medium ${isDarkMode?"dark:text-white":"text-gray-900"} `}>{img?img.name:"Cover Photo"}</label>
<label htmlFor='img'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-15 h-10 ${isDarkMode?"text-white":"text-gray-900"} ${img? "text-green-700" :""}`}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

</label>
</div>
</div>
<input type="file" id="file"  className='hidden'  onChange={(e)=>setData(e.target.files[0])}/>
<input type="file" id="img"  className='hidden'  onChange={(e)=>setImg(e.target.files[0])}/>
<div className='w-full flex   justify-center'>
<button type="button" disabled={check} onClick={handleUpload} className="w-[50%]  mt-[20px] flex items-center  justify-center h-fit py-[10px] px-[50px] bg-green-900 rounded-[10px] gap-[12px]">
         
         <span className="font-normal text-[16px] text-white">

         {check?   <>
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Uploading ...
         </>: "Upload"
      
      
         
         }
         </span>
      
       </button>
       </div>
  
</form>
</div>
<br/>

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

export default index