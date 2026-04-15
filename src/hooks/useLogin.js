import { useState } from "react";
import { getResetPasswordLinkApi, loginUser, resendVerifMailApi, resetPasswordApi, verifyUserEmailApi } from "../api/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import handleErrorCase from "../utils/handleErrorCase";


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
                toast.error(errormessage, {position: "top-center"})
                setLoginLoading(false)
                return
            }else{
                let tokenfromresponse = response?.data?.data?.data?.token

                localStorage.setItem(authToken, tokenfromresponse)
                accessToken = tokenfromresponse
                isLoggedIn = true
                navigate("/dashboard/events")
            }
        }catch(err){
            console.log("login error", err)
            setStatus({error: true, message: err.message})
            setLoginLoading(false)
        }
        
    }

    async function getResetPasswordLink(email){
        setLoginLoading(true)
        let response = await getResetPasswordLinkApi(email)
        console.log("get reset password response", response)
        if(response.err){
            handleErrorCase(response, logout, setStatus, setLoginLoading, true)
        }else{
            setLoginLoading(false)
            setStatus({error: false, success: true, message: response.data.data.message})
            toast.success("Link has been sent to your email")
        }
    }

    async function resetPassword(userid, token, payload){
        setLoginLoading(true)
        let response = await resetPasswordApi(token, userid, payload)
        if(response.err){
            handleErrorCase(response, logout, setStatus, setLoginLoading, true)
        }else{
            setLoginLoading(false)
            setStatus({error: false, success: true, message: response.data.data.message})
            navigate("/auth/login")
            toast.success("Password reset successfully.")
        }
    }

        async function resendVerifMail(email){
            setLoginLoading(true)
            let response = await resendVerifMailApi({email})
            if(response.err){
                handleErrorCase(response, logout, setStatus, setLoginLoading, true)
            }else{
                setLoginLoading(false)
            }
        }
    
        async function verifyUserMail(userid, verifcationtoken){
            console.log("verif mail running..")
            setLoginLoading(true)
            let response = await verifyUserEmailApi(userid, verifcationtoken)
            if(response.err){
                handleErrorCase(response, logout, setStatus, setLoginLoading, true)
            }else{
                setLoginLoading(false)
                setStatus({error: false, success: true, message: "Verification Complete"})
            }
        }

    function logout(){
        localStorage.removeItem(authToken)
        accessToken = ""
        isLoggedIn = false
        navigate("/auth/login")
    }

    return { 
        login, 
        logout, 
        getResetPasswordLink, 
        resetPassword, 
        isLoggedIn, 
        loginLoading, 
        status, 
        accessToken,
        resendVerifMail,
        verifyUserMail
    }
}