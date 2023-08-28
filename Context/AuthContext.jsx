import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/firebase";

export const AuthContext= createContext()
export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrentUser]= useState()
    const[isDarkMode, setIsDarkMode]= useState(true)
    const toggleTheme= ()=>{
        return setIsDarkMode(!isDarkMode)
        }
    useEffect(()=>{

        const caller= ()=>{
  
          onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            });
           
         
        }

        return caller()
          
  
      },[])
      const isUserAuthenticated = () =>!!currentUser;

      
      return(
    
          <AuthContext.Provider value={{currentUser,toggleTheme,setIsDarkMode, isDarkMode}}>
              {children}
          </AuthContext.Provider>
  
      )
}