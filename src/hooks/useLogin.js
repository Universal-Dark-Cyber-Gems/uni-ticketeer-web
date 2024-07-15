import { useState } from "react";
import { loginUser } from "../api/login";
import { useNavigate } from "react-router-dom";


let authToken = "ticketeerAuthToken"

export default function useLogin(){
    let navigate = useNavigate()
    let accessToken = localStorage.getItem(authToken)
    let isLoggedIn = false

    let [loginLoading, setLoginLoading] = useState(false)
    let [status, setStatus] = useState({error: false, success: false, message: ""})

    
    if(accessToken !== null){
        isLoggedIn = true
    }

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
                            response.error?.response?.data
                            ?
                            response.error?.response?.data?.message
                            :
                            response.error?.message
                
                setStatus({error: true, message: errormessage })
                setLoginLoading(false)
                return
            }else{
                let tokenfromresponse = response?.data?.data?.data?.token

                localStorage.setItem(authToken, tokenfromresponse)
                accessToken = tokenfromresponse
                isLoggedIn = true
                navigate("/dashboard")
            }
        }catch(err){
            console.log("login error", err)
            setStatus({error: true, message: err.message})
            setLoginLoading(false)
        }
        
    }

    function logout(){
        localStorage.removeItem(authToken)
        accessToken = ""
        isLoggedIn = false
        navigate("/auth/login")
    }

    return { login, logout, isLoggedIn, loginLoading, status, accessToken }
}