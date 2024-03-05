import { useEffect, useState } from "react";
import { loginUser } from "../api/login";

let authToken = "ticketeerAuthToken"

export default function useLogin(){
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [loginLoading, setLoginLoading] = useState(false)
    let [status, setStatus] = useState({error: false, message: ""})

    useEffect(()=>{
        let token = localStorage.getItem(authToken)
        if(token){
            setIsLoggedIn(true)
        }
    },[])

    async function login(payload){
        setLoginLoading(true)
        try{
            let response = await loginUser(payload)
            console.log("login response", response)
            if(response.err){
                let errormessage = response.error?.response?.data?.data 
                            ? 
                            response.error?.response?.data?.data[0]?.message
                            :
                            response.error?.response?.data?.message
                
                setStatus({error: true, message: errormessage })
                setLoginLoading(false)
                return
            }


            setLoginLoading(false)
        }catch(err){
            console.log("login error", err)
            setStatus({error: true, message: err.message})
            setLoginLoading(false)
        }
        
    }

    return { login, isLoggedIn, loginLoading, status }
}