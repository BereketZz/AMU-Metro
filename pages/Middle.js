import { NextRequest } from "next/server";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function Middleware(req){
    let cookies= res.cookies
    const{currentUser}= useContext(AuthContext)
    let url= req.url
    if(!cookies && url.includes('/try')){
        return NextRequest.redirect('http://localhost:3000/login')
    }

}