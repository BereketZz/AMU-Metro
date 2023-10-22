import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { db } from '../firebase'
import { onSnapshot,doc } from 'firebase/firestore'


export const AuthContext= createContext()
export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrentUser]= useState()
    const[isDarkMode, setIsDarkMode]= useState(true)
    const [res, setRes]= useState([])
    const [sub, setSub]= useState([])
    const [temp, setTemp]= useState(null)

    const toggleTheme= ()=>{
        return setIsDarkMode(!isDarkMode)
        }
    useEffect(()=>{

        const caller= ()=>{
  
          onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            });
           
         
        }
        const unSub= onSnapshot(doc(db, "research","rcol"), (doc)=>{
         
            if(doc.exists()){
            
                setRes(doc.data().researchs)
                
               
            }  
        })
        const subEmail= onSnapshot(doc(db, "sub","subscribe"), (doc)=>{
         
            if(doc.exists()){
            
                setSub(doc.data().email)
                
               
            }  
        })


        return caller() && unSub() && subEmail()
          
  
      },[])
      const isUserAuthenticated = () =>!!currentUser;

      
      return(
    
          <AuthContext.Provider value={{currentUser,toggleTheme,setIsDarkMode, isDarkMode,res, sub, temp , setTemp}}>
              {children}
          </AuthContext.Provider>
  
      )
}