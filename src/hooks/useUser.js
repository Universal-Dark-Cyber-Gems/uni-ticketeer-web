import { useEffect, useState } from "react";
import { getUserApi } from "../api/usersapi";
import useLogin from "./useLogin";
import getErrorMsg from "../utils/getErrorMsg";

export default function useUser(){
    let { accessToken, logout } = useLogin()
    let [user, setUser] = useState(null)
    let [userLoading, setUserLoading] = useState(false)
    let [userStatus, setUserStatus] = useState({error: false, success: false, message: ""})


    async function getUserProfile(){
        setUserLoading(true)
        console.log("accesstoken", accessToken)
        let response = await getUserApi(accessToken)
        console.log("response from getting profile", response)
        let errormsg = getErrorMsg(response)
        if(response.err){
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setUserStatus({error: true, success: false, message: errormsg})  
            setUserLoading(false)
        }else{
            console.log("before setting user:", response?.result?.data?.data)
            setUser(response?.result?.data?.data)
            setUserStatus({error: false, success: true, message: "user profile fetched"})
            setUserLoading(false)
        }
    }
    useEffect(()=>{
        if(user===null){
            async function getInitialUser(){
                await getUserProfile()
            }
            getInitialUser()
        }
    }, [user])
    
    return { user, userLoading, userStatus,  }
}