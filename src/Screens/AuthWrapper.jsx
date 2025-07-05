import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";

export default function AuthWrapper({children}){
    let { isLoggedIn } = useLogin()
    let navigate = useNavigate()
    
    console.log("isuserloggedin:", isLoggedIn)
    
    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/auth/login")
            return
        }
    }, [isLoggedIn])

    return children
}