
import { NextRequest } from "next/server";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function Middleware(req){

    const{currentUser}= useContext(AuthContext)
    let url= req.url
    if(!currentUser && url.includes('/dashboard')){
        return NextRequest.redirect('/login')
    }

}